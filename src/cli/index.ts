#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

program
  .name('keyroll')
  .description('Local-first personal data storage CLI')
  .version('0.1.0');

program
  .command('start')
  .description('Start the server')
  .option('-p, --port <port>', 'Port number', '3000')
  .action((options) => {
    const spinner = ora('Starting server...').start();
    console.log(chalk.green(`Server would start on port ${options.port}`));
    spinner.stop();
  });

program
  .command('status')
  .description('Check server status')
  .action(() => {
    console.log(chalk.blue('Server status: checking...'));
  });

program
  .command('volume:list')
  .description('List all volumes')
  .action(() => {
    console.log(chalk.blue('Volumes:'));
  });

program
  .command('volume:create <name>')
  .description('Create a new volume')
  .option('-s, --schema <schema>', 'Volume schema')
  .action((name, options) => {
    console.log(chalk.green(`Would create volume: ${name}`));
    if (options.schema) {
      console.log(chalk.gray(`Schema: ${options.schema}`));
    }
  });

program
  .command('device:list')
  .description('List all devices')
  .action(() => {
    console.log(chalk.blue('Devices:'));
  });

program
  .command('device:register <name>')
  .description('Register a new device')
  .action((name) => {
    console.log(chalk.green(`Would register device: ${name}`));
  });

program.parse();
