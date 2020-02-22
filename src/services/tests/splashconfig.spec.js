import { getSplashCommands } from '../splashconfig';
import { getConfigs } from '../cosmicconfig';
import CommandList from '../../models/CommandList';

jest.mock('../cosmicconfig', () => ({
  getConfigs: jest.fn()
}));

jest.mock('../../models/CommandList');

beforeEach(() => {
  jest.clearAllMocks();
});

test('ShellJs Service: Should run shelljs command with the passed command', async () => {
  const allConfigs = Symbol('allConfigs');
  const allCommands = Symbol('allCommands');
  getConfigs.mockImplementation(() => Promise.resolve(allConfigs));
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

test('ShellJs Service: Should run shelljs command with the passed command', async () => {
  const errorSymbol = Symbol('error');
  const allCommands = Symbol('allCommands');
  getConfigs.mockImplementation(() => Promise.reject(errorSymbol));
  CommandList.mockImplementation(() => {
    return {
      commands: allCommands
    };
  });

  try {
    await getSplashCommands();
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBe(errorSymbol);
  }
});
