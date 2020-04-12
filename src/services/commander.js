import program from 'commander';
import { version } from '../../package.json';
import { unknownOptions } from '../helpers';
import getProcessArgs from '../helpers/getProcessArgs';
import Commander from '../models/Commander';
import UnknownCommandException from '../exceptions/UnknownCommandException';
import helpString from '../configs/helpString';

const buildCommand = (command, callback) => {
  if (!command?.commandName) return;
  const { description, commandName } = command;

  program
    .command(commandName)
    .description(description)
    .allowUnknownOption()
    .action((...commanderOptions) => {
      if (!callback) return;
      const commander = new Commander(commanderOptions);
      callback(command, commander.unknownOptions);
    });
};

export const init = () => {
  const processArgs = getProcessArgs();
  unknownOptions(program, processArgs);
  program.version(version);
};

export const parse = () => {
  const processArgs = getProcessArgs();
  program.parse(processArgs);
};

export const buildCommands = (commands, callback) => {
  if (!commands || !Array.isArray(commands)) return;
  commands.forEach(command => buildCommand(command, callback));
};

export const handleUnknownCommands = () => {
  program.on('command:*', () => {
    throw new UnknownCommandException(program.args.join(' '));
  });
};

export const buildHelp = () => {
  program.on('--help', () => {
    helpString.forEach(helpStringItem => {
      // eslint-disable-next-line no-console
      console.log(helpStringItem);
    });
  });
};
