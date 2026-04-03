#!/usr/bin/env node
import { spawn, ChildProcess } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import readline from 'node:readline';

import ora from 'ora';
import chalk from 'chalk';
import { Command } from 'commander';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
    fs.readFileSync(join(__dirname, '../../package.json'), 'utf-8')
);

const program = new Command();

// PID file path for background server
const keyrollDir = join(os.homedir(), '.keyroll');
const pidFile = join(keyrollDir, 'server.pid');
const portFile = join(keyrollDir, 'server.port');
const dbFile = join(keyrollDir, 'keyroll.db');

// Default port
const DEFAULT_PORT = 3000;

function isServerRunning(): boolean {
  if (!fs.existsSync(pidFile)) {
    return false;
  }
  const pid = parseInt(fs.readFileSync(pidFile, 'utf-8'), 10);
  if (isNaN(pid)) {
    return false;
  }
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function getServerInfo(): { running: boolean; pid?: number; port?: number; } {
  const running = isServerRunning();
  const info: { running: boolean; pid?: number; port?: number; } = { running };
  if (running) {
    info.pid = parseInt(fs.readFileSync(pidFile, 'utf-8'), 10);
    if (fs.existsSync(portFile)) {
      info.port = parseInt(fs.readFileSync(portFile, 'utf-8'), 10);
    }
  }
  return info;
}

function showStatus(): void {
  const serverInfo = getServerInfo();
  console.log();
  console.log(chalk.bold(packageJson.name));
  console.log(chalk.gray('='.repeat(50)));
  console.log(chalk.white(`Name`) + chalk.gray(' '.repeat(14)) + chalk.bold(packageJson.name));
  console.log(chalk.white(`Description`) + chalk.gray(' '.repeat(9)) + chalk.italic(packageJson.description));
  console.log(chalk.white(`Version`) + chalk.gray(' '.repeat(13)) + chalk.green(packageJson.version));
  const serverStatus = serverInfo.running
    ? chalk.green(`Running (PID ${serverInfo.pid})`)
    : chalk.yellow('Not running');
  console.log(chalk.white(`Server`) + chalk.gray(' '.repeat(14)) + serverStatus);
  if (serverInfo.running && serverInfo.port) {
    console.log(chalk.white(`Port`) + chalk.gray(' '.repeat(16)) + chalk.cyan(`${serverInfo.port}`));
    console.log(chalk.white(`URL`) + chalk.gray(' '.repeat(17)) + chalk.cyan(`http://localhost:${serverInfo.port}`));
  }
  console.log();
  console.log(chalk.bold('Available Commands'));
  console.log(chalk.gray('-'.repeat(50)));
  console.log(chalk.cyan('  setup') + chalk.gray(' '.repeat(13)) + 'Initialize the system (first-time setup)');
  console.log(chalk.cyan('  start') + chalk.gray(' '.repeat(13)) + 'Start the background server');
  console.log(chalk.cyan('  close') + chalk.gray(' '.repeat(13)) + 'Close the background server');
  console.log();
}

/**
 * Wait for server to be ready
 */
async function waitForServer(port: number, maxAttempts = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/api/authn/status`);
      if (res.ok) { return true; }
    } catch {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return false;
}

/**
 * Call password/create API to initialize
 */
async function callInitialize(password: string, port: number): Promise<{ recoveryCode: string; }> {
  const res = await fetch(`http://localhost:${port}/api/authn/password/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const errData = data as { errorId?: string; content?: { message?: string; }; };
    throw new Error(errData.errorId ?? 'Failed to initialize');
  }
  const content = data?.content as { recoveryCode?: string; } | undefined;
  if (!content?.recoveryCode) {
    throw new Error('No recoveryCode returned');
  }
  return { recoveryCode: content.recoveryCode };
}

program
    .name('keyroll')
    .description('Local-first personal data storage CLI')
    .version(packageJson.version);

program
    .command('setup')
    .description('Initialize the system (first-time setup)')
    .option('-p, --port <port>', 'Port number for server (default: 3000)')
    .action(async (options: { port?: string; }) => {
      const port = options.port ? parseInt(options.port, 10) : DEFAULT_PORT;

      // Check if already initialized
      if (fs.existsSync(dbFile)) {
        console.log();
        console.log(chalk.yellow('System is already initialized.'));
        console.log(chalk.gray('Database file') + `  ${dbFile}`);
        console.log();
        console.log(chalk.gray('To reset, delete the database file and run again.'));
        console.log();
        return;
      }

      console.log();
      console.log(chalk.bold('Keyroll Initialization'));
      console.log(chalk.gray('='.repeat(50)));
      console.log();

      // Ensure keyroll dir exists
      if (!fs.existsSync(keyrollDir)) {
        fs.mkdirSync(keyrollDir, { recursive: true });
      }

      // Ask for password
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const askPassword = (): Promise<string> => {
        return new Promise((resolve) => {
          rl.question(chalk.cyan('Enter password (6-16 digits)  '), (answer) => {
            resolve(answer.trim());
          });
        });
      };

      const password = await askPassword();
      rl.close();

      // Validate password
      if (!/^\d{6,16}$/.test(password)) {
        console.log();
        console.log(chalk.red('Invalid password. Must be 6-16 digits.'));
        console.log();
        return;
      }

      // Start server temporarily for initialization
      const spinner = ora('Starting server for initialization...').start();

      const serverPath = join(__dirname, '../../dist/server/index.js');
      const logFile = join(keyrollDir, 'server.log');
      const logStream = fs.openSync(logFile, 'a');
      const child: ChildProcess = spawn('node', [serverPath], {
        detached: true,
        stdio: ['ignore', logStream, logStream],
        env: { ...process.env, PORT: port.toString() }
      });

      fs.writeFileSync(pidFile, child.pid!.toString());
      fs.writeFileSync(portFile, port.toString());
      child.unref();

      spinner.text = 'Waiting for server...';

      const ready = await waitForServer(port);
      if (!ready) {
        spinner.fail('Server failed to start');
        console.log();
        console.log(chalk.gray('Check logs at  ') + logFile);
        console.log();
        return;
      }

      spinner.text = 'Initializing system...';

      try {
        const result = await callInitialize(password, port);

        spinner.succeed('System initialized');

        console.log();
        console.log(chalk.green('='.repeat(50)));
        console.log(chalk.bold('Recovery Code'));
        console.log(chalk.gray('='.repeat(50)));
        console.log();
        console.log(chalk.bold.yellow(result.recoveryCode));
        console.log();
        console.log(chalk.red('IMPORTANT  Save this recovery code in a secure location!'));
        console.log(chalk.gray(' '.repeat(17)) + 'It is the only way to recover your data if you');
        console.log(chalk.gray(' '.repeat(17)) + 'forget your password.');
        console.log();
        console.log(chalk.gray('Database file  ') + dbFile);
        console.log();

        // Ask to keep server running
        const keepRunning = await new Promise<boolean>((resolve) => {
          const rl2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl2.question(chalk.cyan('Keep the server running? [Y/n]  '), (answer) => {
            rl2.close();
            resolve(answer.toLowerCase() !== 'n');
          });
        });

        if (!keepRunning) {
          try {
            process.kill(child.pid!, 'SIGTERM');
            fs.unlinkSync(pidFile);
            if (fs.existsSync(portFile)) {
              fs.unlinkSync(portFile);
            }
            console.log();
            console.log(chalk.green('Server stopped.'));
            console.log();
          } catch {
            // Server may have already stopped
          }
        }

      } catch (err: unknown) {
        spinner.fail('Failed to initialize');
        const msg = err instanceof Error ? err.message : 'Unknown error';
        console.log();
        console.log(chalk.red(`Error  ${msg}`));
        console.log();
      }
    });

program
    .command('start')
    .description('Start the server in background')
    .option('-p, --port <port>', 'Port number (default: 3000)')
    .action((options) => {
      if (isServerRunning()) {
        console.log();
        console.log(chalk.yellow('Server is already running'));
        console.log();
        return;
      }
      // Ensure keyroll dir exists
      if (!fs.existsSync(keyrollDir)) {
        fs.mkdirSync(keyrollDir, { recursive: true });
      }
      // Check if initialized (warning only, don't block)
      if (!fs.existsSync(dbFile)) {
        console.log();
        console.log(chalk.yellow('System not initialized'));
        console.log(chalk.gray('Open ') + chalk.cyan(`http://localhost:${options.port ? parseInt(options.port, 10) : DEFAULT_PORT}`) + chalk.gray(' in browser to initialize.'));
        console.log();
      }
      const port = options.port ? parseInt(options.port, 10) : DEFAULT_PORT;
      const spinner = ora('Starting server...').start();
      const serverPath = join(__dirname, '../../dist/server/index.js');
      const logFile = join(keyrollDir, 'server.log');
      const logStream = fs.openSync(logFile, 'a');
      const child = spawn('node', [serverPath], {
        detached: true,
        stdio: ['ignore', logStream, logStream],
        env: { ...process.env, PORT: port.toString() }
      });
      fs.writeFileSync(pidFile, child.pid!.toString());
      fs.writeFileSync(portFile, port.toString());
      child.unref();
      spinner.stop();
      console.log();
      console.log(chalk.green(`Server started on port ${port} (PID ${child.pid})`));
      console.log(chalk.gray(' '.repeat(17)) + chalk.cyan(`http://localhost:${port}`));
      console.log();
    });

program
    .command('close')
    .description('Close the background server')
    .action(() => {
      if (!isServerRunning()) {
        console.log();
        console.log(chalk.yellow('Server is not running'));
        console.log();
        return;
      }
      const pid = parseInt(fs.readFileSync(pidFile, 'utf-8'), 10);
      try {
        process.kill(pid, 'SIGTERM');
        fs.unlinkSync(pidFile);
        if (fs.existsSync(portFile)) {
          fs.unlinkSync(portFile);
        }
        console.log();
        console.log(chalk.green(`Server stopped (PID ${pid})`));
        console.log();
      } catch (err) {
        console.log();
        console.log(chalk.red(`Failed to stop server  ${err}`));
        console.log();
      }
    });

// If no command provided, show status
if (!process.argv.slice(2).length) {
  showStatus();
  process.exit(0);
} else {
  program.parse();
}
