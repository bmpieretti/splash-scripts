import { chance } from '@splash-plus/jest-config';
import { getSplashCommands } from '../splashconfig';
import { getConfigs } from '../cosmicconfig';
import CommandList from '../../models/CommandList';

jest.mock('../cosmicconfig');

jest.mock('../../models/CommandList');

beforeEach(() => {
  jest.clearAllMocks();
});

test('ShellJs Service: Should run shelljs command with the passed command', async () => {
  const allConfigs = Symbol('allConfigs');
  const allCommands = Symbol('allCommands');
  getConfigs.mockResolvedValue(allConfigs);
  CommandList.mockImplementation(() => {
    return {
      commands: allCommands
    };
  });

  const actualCommands = await getSplashCommands();

  expect(CommandList).toHaveBeenCalledTimes(1);
  expect(CommandList).toHaveBeenCalledWith(allConfigs);
  expect(actualCommands).toBe(allCommands);
});

test('ShellJs Service: Should handle errors thrown from config generation', async () => {
  const error = new Error(chance.word());
  const allCommands = Symbol('allCommands');
  getConfigs.mockRejectedValue(error);

  CommandList.mockImplementation(() => {
    return {
      commands: allCommands
    };
  });

  await expect(getSplashCommands()).rejects.toThrow(error);
});
