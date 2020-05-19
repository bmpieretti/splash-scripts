import { chance } from '@splash-plus/jest-config';
import {
  VALID_COMMAND_NAME_ERROR_MESSAGE,
  VALID_COMMAND_FIELD_ERROR_MESSAGE,
  VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE,
  VALID_COMMAND_RESOLVE_OPTIONS_ERROR_MESSAGE
} from '../../configs/textEnums';
import ConfigCommands from '../ConfigCommands';
import resolveOptions from '../../configs/resolveOptions';

test('ConfigCommand Model: Should init ConfigCommand object with valid commands', () => {
  const name = chance.word();
  const command = chance.sentence();
  const description = chance.sentence();

  const commands = [
    {
      name,
      command,
      description
    }
  ];

  const configCommand = new ConfigCommands(commands);

  const expectedPreBuiltCommand = {
    [name]: {
      command,
      description
    }
  };

  expect(configCommand.preBuiltCommands).toEqual(expectedPreBuiltCommand);
  expect(configCommand.errors).toHaveLength(0);
  expect(configCommand.warnings).toHaveLength(0);
});

test('ConfigCommand Model: Should init ConfigCommand object with all valid commands', () => {
  const resolve = resolveOptions[Math.round(Math.random(0, 1))];
  const name = chance.word();
  const command = chance.sentence();
  const description = chance.sentence();

  const commands = [
    {
      name,
      command,
      description,
      resolve
    }
  ];

  const configCommand = new ConfigCommands(commands);

  const expectedPreBuiltCommand = {
    [name]: {
      command,
      description,
      path: undefined,
      resolve
    }
  };

  expect(configCommand.preBuiltCommands).toEqual(expectedPreBuiltCommand);
  expect(configCommand.errors).toHaveLength(0);
  expect(configCommand.warnings).toHaveLength(0);
});

test('ConfigCommands Model: Should init ConfigCommands object with valid commands and path', () => {
  const path = Symbol('path');
  const name = chance.word();
  const command = chance.sentence();
  const description = chance.sentence();

  const commands = [
    {
      name,
      command,
      description
    }
  ];

  const configCommands = new ConfigCommands(commands, path);

  const expectedPreBuiltCommand = {
    [name]: {
      command,
      description,
      path
    }
  };

  expect(configCommands.preBuiltCommands).toEqual(expectedPreBuiltCommand);
  expect(configCommands.errors).toHaveLength(0);
  expect(configCommands.warnings).toHaveLength(0);
});

test('ConfigCommands Model: Should error when missing name', () => {
  const commands = [
    {
      command: chance.sentence(),
      description: chance.word()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.errors).toHaveLength(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_NAME_ERROR_MESSAGE
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should error when name is not a string', () => {
  const commands = [
    {
      name: Symbol('test'),
      command: chance.sentence(),
      description: chance.word()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.errors).toHaveLength(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_NAME_ERROR_MESSAGE
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should only throw one error when missing name', () => {
  const commands = [
    {
      description: chance.word()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.errors).toHaveLength(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_NAME_ERROR_MESSAGE
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should error when missing command', () => {
  const name = chance.word();

  const commands = [
    {
      name,
      description: chance.word()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.errors).toHaveLength(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_FIELD_ERROR_MESSAGE(name)
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should error when command is not a string', () => {
  const name = chance.word();

  const commands = [
    {
      name,
      command: Symbol('test'),
      description: chance.word()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.errors).toHaveLength(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_FIELD_ERROR_MESSAGE(name)
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should warn when missing description', () => {
  const name = chance.word();

  const commands = [
    {
      name,
      command: chance.sentence()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.warnings).toHaveLength(1);
  expect(configCommands.warnings[0].message).toBe(
    VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE(name)
  );
  expect(configCommands.warnings[0].level).toBe('warning');
  expect(configCommands.warnings[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should warn when description not a string', () => {
  const name = chance.word();

  const commands = [
    {
      name,
      command: chance.sentence(),
      description: Symbol('test')
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.warnings).toHaveLength(1);
  expect(configCommands.warnings[0].message).toBe(
    VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE(name)
  );
  expect(configCommands.warnings[0].level).toBe('warning');
  expect(configCommands.warnings[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should error when resolve is not one of local or npx', () => {
  const name = chance.word();
  const resolve = chance.word();

  const commands = [
    {
      name,
      command: chance.word(),
      description: chance.word(),
      resolve
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.errors).toHaveLength(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_RESOLVE_OPTIONS_ERROR_MESSAGE(name, resolve, resolveOptions)
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should throw multiple errors', () => {
  const commands = [
    {
      name: chance.word(),
      description: chance.word()
    },
    {
      name: chance.word(),
      command: chance.word(),
      description: chance.word(),
      resolve: true
    },
    {
      command: chance.word(),
      description: chance.word()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.errors).toHaveLength(3);
});

test('ConfigCommands Model: Should throw multiple warnings', () => {
  const commands = [
    {
      name: chance.word(),
      command: chance.word()
    },
    {
      name: chance.word(),
      command: chance.word()
    },
    {
      name: chance.word(),
      command: chance.word()
    }
  ];

  const configCommands = new ConfigCommands(commands);

  expect(configCommands.warnings).toHaveLength(3);
});
