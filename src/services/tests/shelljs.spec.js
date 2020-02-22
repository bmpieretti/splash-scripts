import shelljs from 'shelljs';
import { runCommand } from '../shelljs';

const ENABLE_OUTPUT_COLOR = '--color=always';

jest.mock('shelljs', () => ({
  exec: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('ShellJs Service: Should run shelljs command with the passed command', () => {
  const execStub = shelljs.exec;
  const command = {
    fullCommand: 'test'
  };

  runCommand(command);

  const expectedMockArgs = `${command.fullCommand} ${ENABLE_OUTPUT_COLOR}`;

  expect(execStub).toHaveBeenCalledTimes(1);
  expect(execStub).toHaveBeenCalledWith(expectedMockArgs);
});

test('ShellJs Service: Should run shelljs command with the passed options', () => {
  const execStub = shelljs.exec;
  const command = {
    fullCommand: 'test'
  };
  const unknownOptions = 'options';

  runCommand(command, unknownOptions);

  const expectedMockArgs = `${command.fullCommand} ${unknownOptions} ${ENABLE_OUTPUT_COLOR}`;

  expect(execStub).toHaveBeenCalledTimes(1);
  expect(execStub).toHaveBeenCalledWith(expectedMockArgs);
});

test('ShellJs Service: Should run shelljs command with the passed options', () => {
  const execStub = shelljs.exec;
  const command = null;

  runCommand(command);

  expect(execStub).not.toHaveBeenCalled();
});

test('ShellJs Service: Should run shelljs command with the passed options', () => {
  const execStub = shelljs.exec;
  const command = {};

  runCommand(command);

  expect(execStub).not.toHaveBeenCalled();
});
