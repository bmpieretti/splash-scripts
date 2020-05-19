import { chance } from '@splash-plus/jest-config';
import CommandList from '../CommandList';
import { VALID_CONFIGS_ERROR_MESSAGE } from '../../configs/textEnums';

test('CommandList Model: Should build minimal command from the given config', () => {
  const command = chance.word();
  const commandName = chance.word();
  const allConfigs = [
    {
      preBuiltCommands: {
        [commandName]: {
          command
        }
      }
    }
  ];

  const commandList = new CommandList(allConfigs);

  expect(commandList.commands).toEqual([
    {
      command,
      fullCommand: `npx ${command}`,
      commandName
    }
  ]);
});

test('CommandList Model: Should merge all configs before creating commands', () => {
  const command = chance.word();
  const commandName = chance.word();
  const command2 = chance.word();
  const commandName2 = chance.word();
  const allConfigs = [
    {
      preBuiltCommands: {
        [commandName]: {
          command
        }
      }
    },
    {
      preBuiltCommands: {
        [commandName2]: {
          command: command2
        }
      }
    }
  ];

  const commandList = new CommandList(allConfigs);

  expect(commandList.commands).toEqual([
    {
      command,
      fullCommand: `npx ${command}`,
      commandName
    },
    {
      command: command2,
      fullCommand: `npx ${command2}`,
      commandName: commandName2
    }
  ]);
});

test('CommandList Model: Should build npx commands from the given config', () => {
  const command = chance.word();
  const commandName = chance.word();
  const allConfigs = [
    {
      preBuiltCommands: {
        [commandName]: {
          command,
          resolve: 'npx'
        }
      }
    }
  ];

  const commandList = new CommandList(allConfigs);

  expect(commandList.commands).toEqual([
    {
      command,
      fullCommand: `npx ${command}`,
      commandName,
      resolve: 'npx'
    }
  ]);
});

test('CommandList Model: Should build local commands from the given config', () => {
  const command = chance.word();
  const commandName = chance.word();
  const allConfigs = [
    {
      preBuiltCommands: {
        [commandName]: {
          command,
          resolve: 'local'
        }
      }
    }
  ];

  const commandList = new CommandList(allConfigs);

  expect(commandList.commands).toEqual([
    {
      command,
      fullCommand: command,
      commandName,
      resolve: 'local'
    }
  ]);
});

test('CommandList Model: Should have no commands on error', () => {
  const allConfigs = chance.word();
  const commandList = new CommandList(allConfigs);

  expect(commandList.errors).toHaveLength(1);
  expect(commandList.commands).toEqual([]);
});

test('CommandList Model: Should error when configs are not array', () => {
  const allConfigs = chance.word();
  const commandList = new CommandList(allConfigs);

  expect(commandList.errors).toHaveLength(1);
  expect(commandList.errors[0].message).toBe(VALID_CONFIGS_ERROR_MESSAGE);
  expect(commandList.errors[0].type).toBe('validation-exception');
});

test('CommandList Model: Should error when configs are empty array', () => {
  const allConfigs = [];
  const commandList = new CommandList(allConfigs);

  expect(commandList.errors).toHaveLength(1);
  expect(commandList.errors[0].message).toBe(VALID_CONFIGS_ERROR_MESSAGE);
  expect(commandList.errors[0].type).toBe('validation-exception');
});
