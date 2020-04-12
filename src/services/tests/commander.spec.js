import program from 'commander';
import Chance from 'chance';
import { version } from '../../../package.json';
import {
  init,
  parse,
  buildCommands,
  handleUnknownCommands,
  buildHelp
} from '../commander';
import { unknownOptions } from '../../helpers';
import getProcessArgs from '../../helpers/getProcessArgs';
import Commander from '../../models/Commander';
import { UNKNOWN_COMMAND_ERROR_MESSAGE } from '../../configs/textEnums';
import helpString from '../../configs/helpString';

const chance = new Chance();

jest.mock('../../helpers', () => ({
  unknownOptions: jest.fn()
}));

jest.mock('../../models/Commander');

jest.mock('commander', () => ({
  init: jest.fn(),
  parse: jest.fn(),
  version: jest.fn(),
  description: jest.fn(),
  allowUnknownOption: jest.fn(),
  command: jest.fn(),
  action: jest.fn(),
  on: jest.fn()
}));

jest.mock('../../helpers/getProcessArgs.js', () => jest.fn());

beforeEach(() => {
  jest.clearAllMocks();
});

test('Commander Service: Should init commander with the given values', () => {
  const processArgs = Symbol('test');
  const versionStub = program.version;

  getProcessArgs.mockReturnValue(processArgs);

  init();

  expect(unknownOptions).toHaveBeenCalledTimes(1);
  expect(unknownOptions).toHaveBeenCalledWith(program, processArgs);
  expect(versionStub).toHaveBeenCalledTimes(1);
  expect(versionStub).toHaveBeenCalledWith(version);
});

test('Commander Service: Should parse commander', () => {
  const processArgs = Symbol('test1');
  const parseStub = program.parse;

  getProcessArgs.mockReturnValue(processArgs);

  parse();

  expect(parseStub).toHaveBeenCalledTimes(1);
  expect(parseStub).toHaveBeenCalledWith(processArgs);
});

test('Commander Service: Should scaffold commander command', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const commandName = Symbol('commandName');
  const description = Symbol('description');
  const command = {
    commandName,
    description
  };
  const commands = [command];

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);

  buildCommands(commands);

  expect(commandStub).toHaveBeenCalledTimes(1);
  expect(commandStub).toHaveBeenCalledWith(commandName);
  expect(descriptionStub).toHaveBeenCalledTimes(1);
  expect(descriptionStub).toHaveBeenCalledWith(description);
  expect(allowUnknownOptionStub).toHaveBeenCalledTimes(1);
  expect(allowUnknownOptionStub).toHaveBeenCalledWith();
});

test('Commander Service: Should scaffold commander commands', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const commandName = Symbol('commandName');
  const description = Symbol('description');
  const commandName2 = Symbol('commandName2');
  const description2 = Symbol('description2');
  const command = {
    commandName,
    description
  };
  const command2 = {
    commandName: commandName2,
    description: description2
  };
  const commands = [command, command2];

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);

  buildCommands(commands);

  expect(commandStub).toHaveBeenCalledTimes(2);
  expect(commandStub).toHaveBeenCalledWith(commandName);
  expect(commandStub).toHaveBeenCalledWith(commandName2);
  expect(descriptionStub).toHaveBeenCalledTimes(2);
  expect(descriptionStub).toHaveBeenCalledWith(description);
  expect(descriptionStub).toHaveBeenCalledWith(description2);
  expect(allowUnknownOptionStub).toHaveBeenCalledTimes(2);
  expect(allowUnknownOptionStub).toHaveBeenCalledWith();
  expect(allowUnknownOptionStub).toHaveBeenCalledWith();
});

test('Commander Service: Should scaffold commander commands with action callback', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const actionStub = program.action;
  const commandName = Symbol('commandName');
  const description = Symbol('description');
  const unknownOptionsSymbol = Symbol('unknownOptions');
  const actionReturn = chance.n(() => Symbol('actionReturn'), chance.d6());
  const callbackStub = jest.fn();
  const command = {
    commandName,
    description
  };
  const commands = [command];

  Commander.mockImplementation(() => ({
    unknownOptions: unknownOptionsSymbol
  }));

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);
  actionStub.mockImplementation(callback => callback(...actionReturn));

  buildCommands(commands, callbackStub);

  expect(commandStub).toHaveBeenCalledTimes(1);
  expect(commandStub).toHaveBeenCalledWith(commandName);
  expect(descriptionStub).toHaveBeenCalledTimes(1);
  expect(descriptionStub).toHaveBeenCalledWith(description);
  expect(allowUnknownOptionStub).toHaveBeenCalledTimes(1);
  expect(allowUnknownOptionStub).toHaveBeenCalledWith();
  expect(actionStub).toHaveBeenCalledTimes(1);
  expect(Commander).toHaveBeenCalledWith(actionReturn);
  expect(callbackStub).toHaveBeenCalledTimes(1);
  expect(callbackStub).toHaveBeenCalledWith(command, unknownOptionsSymbol);
});

test('Commander Service: Should skip command with undefined command', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const command = null;
  const commands = [command];

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);

  buildCommands(commands);

  expect(commandStub).toHaveBeenCalledTimes(0);
  expect(descriptionStub).toHaveBeenCalledTimes(0);
  expect(allowUnknownOptionStub).toHaveBeenCalledTimes(0);
});

test('Commander Service: Should skip command with undefined command name', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const command = { description: 'Yo' };
  const commands = [command];

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);

  buildCommands(commands);

  expect(commandStub).toHaveBeenCalledTimes(0);
  expect(descriptionStub).toHaveBeenCalledTimes(0);
  expect(allowUnknownOptionStub).toHaveBeenCalledTimes(0);
});

test('Commander Service: Should skip action with no callback', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const actionStub = program.action;
  const commandName = Symbol('commandName');
  const description = Symbol('description');
  const unknownOptionsSymbol = Symbol('unknownOptions');
  const actionReturn = chance.n(() => Symbol('actionReturn'), chance.d6());
  const command = {
    commandName,
    description
  };
  const commands = [command];

  Commander.mockImplementation(() => ({
    unknownOptions: unknownOptionsSymbol
  }));

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);
  actionStub.mockImplementation(callback => callback(...actionReturn));

  buildCommands(commands);

  expect(commandStub).toHaveBeenCalledTimes(1);
  expect(commandStub).toHaveBeenCalledWith(commandName);
  expect(descriptionStub).toHaveBeenCalledTimes(1);
  expect(descriptionStub).toHaveBeenCalledWith(description);
  expect(allowUnknownOptionStub).toHaveBeenCalledTimes(1);
  expect(allowUnknownOptionStub).toHaveBeenCalledWith();
  expect(actionStub).toHaveBeenCalledTimes(1);
  expect(Commander).not.toHaveBeenCalled();
});

test('Commander Service: Should not scaffold commander commands with no commands', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const actionStub = program.action;
  const unknownOptionsSymbol = Symbol('unknownOptions');
  const actionReturn = chance.n(() => Symbol('actionReturn'), chance.d6());

  Commander.mockImplementation(() => ({
    unknownOptions: unknownOptionsSymbol
  }));

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);
  actionStub.mockImplementation(callback => callback(...actionReturn));

  buildCommands(null);

  expect(commandStub).not.toHaveBeenCalled();
  expect(descriptionStub).not.toHaveBeenCalled();
  expect(allowUnknownOptionStub).not.toHaveBeenCalled();
});

test('Commander Service: Should not scaffold commander commands when incorrect type passed', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const actionStub = program.action;
  const unknownOptionsSymbol = Symbol('unknownOptions');
  const actionReturn = chance.n(() => Symbol('actionReturn'), chance.d6());
  const commands = Symbol('test');

  Commander.mockImplementation(() => ({
    unknownOptions: unknownOptionsSymbol
  }));

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);
  actionStub.mockImplementation(callback => callback(...actionReturn));

  buildCommands(commands);

  expect(commandStub).not.toHaveBeenCalled();
  expect(descriptionStub).not.toHaveBeenCalled();
  expect(allowUnknownOptionStub).not.toHaveBeenCalled();
});

test('Commander Service: Should not scaffold commander command when no commandName passed', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const actionStub = program.action;
  const unknownOptionsSymbol = Symbol('unknownOptions');
  const actionReturn = chance.n(() => Symbol('actionReturn'), chance.d6());
  const commands = {
    description: 'test'
  };

  Commander.mockImplementation(() => ({
    unknownOptions: unknownOptionsSymbol
  }));

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);
  actionStub.mockImplementation(callback => callback(...actionReturn));

  buildCommands(commands);

  expect(commandStub).not.toHaveBeenCalled();
  expect(descriptionStub).not.toHaveBeenCalled();
  expect(allowUnknownOptionStub).not.toHaveBeenCalled();
});

test('Commander Service: Should not scaffold commander command when no commandName passed', () => {
  const commandStub = program.command;
  const descriptionStub = program.description;
  const allowUnknownOptionStub = program.allowUnknownOption;
  const actionStub = program.action;
  const unknownOptionsSymbol = Symbol('unknownOptions');
  const actionReturn = chance.n(() => Symbol('actionReturn'), chance.d6());
  const commands = {
    commandName: 'test'
  };

  Commander.mockImplementation(() => ({
    unknownOptions: unknownOptionsSymbol
  }));

  commandStub.mockReturnValue(program);
  descriptionStub.mockReturnValue(program);
  allowUnknownOptionStub.mockReturnValue(program);
  actionStub.mockImplementation(callback => callback(...actionReturn));

  buildCommands(commands);

  expect(commandStub).not.toHaveBeenCalled();
  expect(descriptionStub).not.toHaveBeenCalled();
  expect(allowUnknownOptionStub).not.toHaveBeenCalled();
});

test('Commander Service: Should handle unknown commands with tailored error', () => {
  const onStub = program.on;
  program.args = ['test', '--option'];

  handleUnknownCommands();
  const callback = onStub.mock.calls[0][1];

  expect(onStub).toHaveBeenCalledTimes(1);
  expect(onStub.mock.calls[0][0]).toBe('command:*');

  try {
    callback();
    expect(true).toBe(false);
  } catch (error) {
    expect(error.message).toBe(UNKNOWN_COMMAND_ERROR_MESSAGE('test --option'));
    expect(error.type).toBe('unknown-command');
  }
});

test('Scripts Index: Should log error stack over error when defined', async () => {
  const onStub = program.on;

  buildHelp();
  const callback = onStub.mock.calls[0][1];
  const consoleLogStub = jest.fn();

  // eslint-disable-next-line no-console
  console.log = consoleLogStub;
  callback();

  expect(onStub).toHaveBeenCalledTimes(1);
  expect(onStub.mock.calls[0][0]).toBe('--help');
  expect(consoleLogStub).toHaveBeenCalledTimes(helpString.length);
  helpString.forEach((helpStringItem, index) => {
    expect(consoleLogStub).toHaveBeenNthCalledWith(index + 1, helpStringItem);
  });
});
