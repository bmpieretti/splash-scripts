import {
  init,
  buildCommands,
  handleUnknownCommands,
  parse
} from '../../services/commander';
import { runCommand } from '../../services/shelljs';
import { getSplashCommands } from '../../services/splashconfig';
import main from '../index';

jest.mock('../../services/splashconfig', () => ({
  runCommand: Symbol('runCommand')
}));

jest.mock('../../services/splashconfig', () => ({
  getSplashCommands: jest.fn()
}));

jest.mock('../../services/commander', () => ({
  init: jest.fn(),
  buildCommands: jest.fn(),
  handleUnknownCommands: jest.fn(),
  parse: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('Scripts Index: Should call root scripts with dependencies', async () => {
  expect.hasAssertions();
  const config = Symbol('config');
  const getSplashCommandsStub = jest.fn().mockResolvedValue(config);

  getSplashCommands.mockImplementation(() => getSplashCommandsStub());

  await main();

  expect(init).toHaveBeenCalledTimes(1);
  expect(init).toHaveBeenCalledWith();
  expect(buildCommands).toHaveBeenCalledTimes(1);
  expect(buildCommands).toHaveBeenCalledWith(config, runCommand);
  expect(handleUnknownCommands).toHaveBeenCalledTimes(1);
  expect(handleUnknownCommands).toHaveBeenCalledWith();
  expect(parse).toHaveBeenCalledTimes(1);
  expect(parse).toHaveBeenCalledWith();
});

test('Scripts Index: Should log errors', async () => {
  expect.hasAssertions();
  const error = { message: 'test', type: 'error-type' };
  const getSplashCommandsStub = jest.fn().mockRejectedValue(error);

  getSplashCommands.mockImplementation(() => getSplashCommandsStub());

  const consoleErrorStub = jest.fn();

  // eslint-disable-next-line no-console
  console.error = consoleErrorStub;

  await main();

  expect(init).not.toHaveBeenCalled();
  expect(buildCommands).not.toHaveBeenCalled();
  expect(parse).not.toHaveBeenCalled();
  expect(consoleErrorStub).toHaveBeenCalledTimes(1);
  expect(consoleErrorStub).toHaveBeenCalledWith(error);
});

test('Scripts Index: Should log error stack over error when defined', async () => {
  expect.hasAssertions();
  const error = { message: 'test', type: 'error-type', stack: 'error-stack' };
  const getSplashCommandsStub = jest.fn().mockRejectedValue(error);

  getSplashCommands.mockImplementation(() => getSplashCommandsStub());

  const consoleErrorStub = jest.fn();

  // eslint-disable-next-line no-console
  console.error = consoleErrorStub;

  await main();

  expect(init).not.toHaveBeenCalled();
  expect(buildCommands).not.toHaveBeenCalled();
  expect(parse).not.toHaveBeenCalled();
  expect(consoleErrorStub).toHaveBeenCalledTimes(1);
  expect(consoleErrorStub).toHaveBeenCalledWith(error.stack);
});
