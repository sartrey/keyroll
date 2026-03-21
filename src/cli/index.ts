#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

import ora from 'ora';
import chalk from 'chalk';
import { Command } from 'commander';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
    fs.readFileSync(join(__dirname, '../../package.json'), 'utf-8')
);

const program = new Command();

program
    .name('keyroll')
    .description('Local-first personal data storage CLI')
    .version(packageJson.version);

// PID file path for background server
const keyrollDir = join(os.homedir(), '.keyroll');
const pidFile = join(keyrollDir, 'server.pid');
const portFile = join(keyrollDir, 'server.port');

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
      console.log(chalk.green(`Server started on port ${port} (PID: ${child.pid})`));
      console.log(chalk.gray(' '.repeat(17)) + chalk.cyan(`http://localhost:${port}`));
      console.log();
    });

program
    .command('stop')
    .description('Stop the background server')
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
        console.log(chalk.green(`Server stopped (PID: ${pid})`));
        console.log();
      } catch (err) {
        console.log();
        console.log(chalk.red(`Failed to stop server: ${err}`));
        console.log();
      }
    });

program
    .command('status')
    .description('Show product status (default command)')
    .action(() => {
      const serverInfo = getServerInfo();
      console.log();
      console.log(chalk.bold(packageJson.name));
      console.log(chalk.gray('='.repeat(50)));
      console.log(chalk.white(`Name`) + chalk.gray(' '.repeat(14)) + chalk.bold(packageJson.name));
      console.log(chalk.white(`Description`) + chalk.gray(' '.repeat(9)) + chalk.italic(packageJson.description));
      console.log(chalk.white(`Version`) + chalk.gray(' '.repeat(13)) + chalk.green(packageJson.version));
      const serverStatus = serverInfo.running
        ? chalk.green(`Running (PID: ${serverInfo.pid})`)
        : chalk.yellow('Not running');
      console.log(chalk.white(`Server`) + chalk.gray(' '.repeat(14)) + serverStatus);
      if (serverInfo.running && serverInfo.port) {
        console.log(chalk.white(`Port`) + chalk.gray(' '.repeat(16)) + chalk.cyan(`${serverInfo.port}`));
        console.log(chalk.white(`URL`) + chalk.gray(' '.repeat(17)) + chalk.cyan(`http://localhost:${serverInfo.port}`));
      }
      console.log();
      console.log(chalk.bold('Available Commands'));
      console.log(chalk.gray('-'.repeat(50)));
      console.log(chalk.cyan('  start') + chalk.gray(' '.repeat(13)) + 'Start the background server');
      console.log(chalk.cyan('  stop') + chalk.gray(' '.repeat(14)) + 'Stop the background server');
      console.log(chalk.cyan('  status') + chalk.gray(' '.repeat(12)) + 'Show this status info');
      console.log();
    });

// Default to status command when no command specified
program.addHelpText('after', `
Run ${chalk.cyan('keyroll status')} for product overview.
`);

// If no command provided, show status
if (!process.argv.slice(2).length) {
  program.parse(['node', ...process.argv.slice(1), 'status']);
} else {
  program.parse();
}
