import {
  VALID_COMMAND_NAME_ERROR_MESSAGE,
  VALID_COMMAND_FIELD_ERROR_MESSAGE,
  VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE,
  VALID_COMMAND_RESOLVE_OPTIONS_ERROR_MESSAGE
} from '../../configs/textEnums';
import ConfigCommands from '../ConfigCommands';
import resolveOptions from '../../configs/resolveOptions';

test('ConfigCommand Model: Should init ConfigCommand object with valid commands', () => {
  const commands = [
    {
      name: 'test',
      command: 'test command',
      description: 'test'
    }
  ];

  const configCommand = new ConfigCommands(commands);

  const expectedPreBuiltCommand = {
    test: {
      command: 'test command',
      description: 'test'
    }
  };

  expect(configCommand.preBuiltCommands).toEqual(expectedPreBuiltCommand);
  expect(configCommand.errors.length).toBe(0);
  expect(configCommand.warnings.length).toBe(0);
});

test('ConfigCommand Model: Should init ConfigCommand object with all valid commands', () => {
  const resolve = resolveOptions[Math.round(Math.random(0, 1))];

  const commands = [
    {
      name: 'test',
      command: 'test command',
      description: 'test',
      resolve
    }
  ];

  const configCommand = new ConfigCommands(commands);

  const expectedPreBuiltCommand = {
    test: {
      command: 'test command',
      description: 'test',
      path: undefined,
      resolve
    }
  };

  expect(configCommand.preBuiltCommands).toEqual(expectedPreBuiltCommand);
  expect(configCommand.errors.length).toBe(0);
  expect(configCommand.warnings.length).toBe(0);
});

test('ConfigCommands Model: Should init ConfigCommands object with valid commands and path', () => {
  const path = Symbol('path');
  const commands = [
    {
      name: 'test',
      command: 'test command',
      description: 'test'
    }
  ];

  const configCommands = new ConfigCommands(commands, path);

  const expectedPreBuiltCommand = {
    test: {
      command: 'test command',
      description: 'test',
      path
    }
  };

  expect(configCommands.preBuiltCommands).toEqual(expectedPreBuiltCommand);
  expect(configCommands.errors.length).toBe(0);
  expect(configCommands.warnings.length).toBe(0);
});

test('ConfigCommands Model: Should error when missing name', () => {
  const commands = [
    {
      command: 'test command',
      description: 'test'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.errors.length).toBe(1);
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
      command: 'test command',
      description: 'test'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.errors.length).toBe(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_NAME_ERROR_MESSAGE
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should only throw one error when missing name', () => {
  const commands = [
    {
      description: 'test'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.errors.length).toBe(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_NAME_ERROR_MESSAGE
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should error when missing command', () => {
  const name = 'test';

  const commands = [
    {
      name,
      description: 'test'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.errors.length).toBe(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_FIELD_ERROR_MESSAGE(name)
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should error when command is not a string', () => {
  const name = 'test';

  const commands = [
    {
      name,
      command: Symbol('test'),
      description: 'test'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.errors.length).toBe(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_FIELD_ERROR_MESSAGE(name)
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should warn when missing description', () => {
  const name = 'test';

  const commands = [
    {
      name,
      command: 'test command'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.warnings.length).toBe(1);
  expect(configCommands.warnings[0].message).toBe(
    VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE(name)
  );
  expect(configCommands.warnings[0].level).toBe('warning');
  expect(configCommands.warnings[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should warn when description not a string', () => {
  const name = 'test';

  const commands = [
    {
      name,
      command: 'test command',
      description: Symbol('test')
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.warnings.length).toBe(1);
  expect(configCommands.warnings[0].message).toBe(
    VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE(name)
  );
  expect(configCommands.warnings[0].level).toBe('warning');
  expect(configCommands.warnings[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should error when resolve is not one of local or npx', () => {
  const name = 'test';
  const resolve = 'test';

  const commands = [
    {
      name,
      command: 'test',
      description: 'test',
      resolve
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.errors.length).toBe(1);
  expect(configCommands.errors[0].message).toBe(
    VALID_COMMAND_RESOLVE_OPTIONS_ERROR_MESSAGE(name, resolve, resolveOptions)
  );
  expect(configCommands.errors[0].level).toBe('error');
  expect(configCommands.errors[0].type).toBe('validation-exception');
});

test('ConfigCommands Model: Should throw multiple errors', () => {
  const commands = [
    {
      name: 'test',
      description: 'test'
    },
    {
      name: 'test2',
      command: 'test2',
      description: 'test2',
      resolve: true
    },
    {
      command: 'test3',
      description: 'test3'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.errors.length).toBe(3);
});

test('ConfigCommands Model: Should throw multiple warnings', () => {
  const commands = [
    {
      name: 'test',
      command: 'test'
    },
    {
      name: 'test2',
      command: 'test2'
    },
    {
      name: 'test3',
      command: 'test3'
    }
  ];

  const configCommands = new ConfigCommands(commands);
  expect(configCommands.warnings.length).toBe(3);
});
