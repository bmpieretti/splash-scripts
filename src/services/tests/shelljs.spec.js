import shelljs from 'shelljs';
import { chance } from '@splash-plus/jest-config';
import { runCommand } from '../shelljs';

const ENABLE_OUTPUT_COLOR = '--color=always';

jest.mock('shelljs', () => ({
  exec: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('ShellJs Service: Should run shelljs command with the passed command', () => {
  const command = {
    fullCommand: chance.word()
  };

  runCommand(command);

  const expectedMockArgs = `${command.fullCommand} ${ENABLE_OUTPUT_COLOR}`;

  expect(shelljs.exec).toHaveBeenCalledTimes(1);
  expect(shelljs.exec).toHaveBeenCalledWith(expectedMockArgs);
});

test('ShellJs Service: Should run shelljs command with the passed options', () => {
  const command = {
    fullCommand: chance.word()
  };
  const unknownOptions = chance.word();

  runCommand(command, unknownOptions);

  const expectedMockArgs = `${command.fullCommand} ${unknownOptions} ${ENABLE_OUTPUT_COLOR}`;

  expect(shelljs.exec).toHaveBeenCalledTimes(1);
  expect(shelljs.exec).toHaveBeenCalledWith(expectedMockArgs);
});

test('ShellJs Service: Should not run shelljs command with null command', () => {
  const command = null;

  runCommand(command);

  expect(shelljs.exec).not.toHaveBeenCalled();
});

test('ShellJs Service: Should not run shelljs command empty object command', () => {
  const command = {};

  runCommand(command);

  expect(shelljs.exec).not.toHaveBeenCalled();
});
