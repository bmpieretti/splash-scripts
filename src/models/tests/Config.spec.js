import Config from '../Config';
import {
  EXTENDS_TYPING_ERROR_MESSAGE,
  VALID_CONFIG_STRUCTURE_ERROR_MESSAGE,
  VALID_COMMAND_ERROR_MESSAGE,
  MAX_DEPTH_ERROR_MESSAGE
} from '../../configs/textEnums';
import ConfigCommands from '../ConfigCommands';

jest.mock('../ConfigCommands');

beforeEach(() => {
  jest.clearAllMocks();
});

test('Config Model: Should init Config object with valid commands', () => {
  const preBuiltCommands = Symbol('preBuiltCommands');

  ConfigCommands.mockImplementation(() => {
    return {
      preBuiltCommands,
      warnings: [],
      errors: []
    };
  });

  const configOptions = {
    commands: [
      {
        name: 'test',
        command: 'test command'
      }
    ]
  };

  const config = new Config(configOptions);

  expect(config.originalConfig).toBe(configOptions);
  expect(config.path).toBe(process.cwd());
  expect(config.extendsArg).toBe(null);
  expect(config.preBuiltCommands).toBe(preBuiltCommands);
  expect(ConfigCommands).toHaveBeenCalledTimes(1);
  expect(ConfigCommands).toHaveBeenCalledWith(
    configOptions.commands,
    config.path
  );
  expect(config.errors.length).toBe(0);
  expect(config.warnings.length).toBe(0);
});

test('Config Model: Should init Config object with the given path', () => {
  const path = Symbol('path');
  const preBuiltCommands = Symbol('preBuiltCommands');

  ConfigCommands.mockImplementation(() => {
    return {
      preBuiltCommands,
      warnings: [],
      errors: []
    };
  });

  const configOptions = {
    commands: [
      {
        name: 'test',
        command: 'test command'
      }
    ]
  };

  const config = new Config(configOptions, path);

  expect(config.originalConfig).toBe(configOptions);
  expect(config.path).toBe(path);
  expect(config.extendsArg).toBe(null);
  expect(config.preBuiltCommands).toBe(preBuiltCommands);
  expect(ConfigCommands).toHaveBeenCalledTimes(1);
  expect(ConfigCommands).toHaveBeenCalledWith(configOptions.commands, path);
  expect(config.errors.length).toBe(0);
  expect(config.warnings.length).toBe(0);
});

test('Config Model: Should init Config object with the given path having only extends', () => {
  const path = Symbol('path');

  ConfigCommands.mockImplementation(() => {
    return {
      warnings: [],
      errors: []
    };
  });

  const configOptions = {
    extends: 'valid path'
  };

  const config = new Config(configOptions, path);

  expect(ConfigCommands).toHaveBeenCalledTimes(1);
  expect(ConfigCommands).toHaveBeenCalledWith([], path);
  expect(config.errors.length).toBe(0);
});

test('Config Model: Should init Config object with the given path having extends and empty commands array', () => {
  const path = Symbol('path');

  ConfigCommands.mockImplementation(() => {
    return {
      warnings: [],
      errors: []
    };
  });

  const configOptions = {
    extends: 'valid path',
    commands: []
  };

  const config = new Config(configOptions, path);

  expect(ConfigCommands).toHaveBeenCalledTimes(1);
  expect(ConfigCommands).toHaveBeenCalledWith([], path);
  expect(config.errors.length).toBe(0);
});

test('Config Model: Should set extends on class when extends is string', () => {
  const configOptions = {
    extends: 'test'
  };

  const config = new Config(configOptions);
  expect(config.extendsArg).toEqual([configOptions.extends]);
});

test('Config Model: Should extend Config object with a given array', () => {
  const configOptions = {
    extends: ['test', 'test1']
  };

  const config = new Config(configOptions);
  expect(config.extendsArg).toEqual([...configOptions.extends]);
});

test('Config Model: Should ignore some properties when config has errors', () => {
  const config = new Config();
  expect(config.errors.length).toBe(1);
  expect(config.extendsArg).toBe(null);
  expect(config.preBuiltCommands).toBe(null);
});

test('Config Model: Should throw error on empty config', () => {
  const config = new Config();
  expect(config.errors.length).toBe(1);
  expect(config.errors[0].message).toBe(VALID_CONFIG_STRUCTURE_ERROR_MESSAGE);
  expect(config.errors[0].level).toBe('error');
  expect(config.errors[0].type).toBe('validation-exception');
});

test('Config Model: Should throw error on empty Commands', () => {
  const configOptions = {
    commands: []
  };

  const config = new Config(configOptions);
  expect(config.errors.length).toBe(1);
  expect(config.errors[0].message).toBe(VALID_CONFIG_STRUCTURE_ERROR_MESSAGE);
  expect(config.errors[0].level).toBe('error');
  expect(config.errors[0].type).toBe('validation-exception');
});

test('Config Model: Should error when extends is not a string or array', () => {
  const configOptions = {
    extends: {}
  };

  const config = new Config(configOptions);
  expect(config.errors.length).toBe(1);
  expect(config.errors[0].message).toBe(EXTENDS_TYPING_ERROR_MESSAGE);
  expect(config.errors[0].level).toBe('error');
  expect(config.errors[0].type).toBe('validation-exception');
});

test('Config Model: Should error when depth is > 100', () => {
  const configOptions = {
    commands: [
      {
        name: 'test',
        command: 'test command'
      }
    ]
  };

  const config = new Config(configOptions, 'path', 101);

  expect(config.errors.length).toBe(1);
  expect(config.errors[0].message).toBe(MAX_DEPTH_ERROR_MESSAGE);
  expect(config.errors[0].level).toBe('error');
  expect(config.errors[0].type).toBe('validation-exception');
});

test('Config Model: Should not error when depth is < 100', () => {
  const configOptions = {
    commands: [
      {
        name: 'test',
        command: 'test command'
      }
    ]
  };

  const config = new Config(
    configOptions,
    'path',
    Math.round(Math.random(0, 100))
  );

  expect(config.errors.length).toBe(0);
});

test('Config Model: Should ignore depth if not a number', () => {
  const configOptions = {
    commands: [
      {
        name: 'test',
        command: 'test command'
      }
    ]
  };

  const config = new Config(configOptions, 'path', Symbol('depth'));

  expect(config.errors.length).toBe(0);
});

test('Config Model: Should error when commands are not an object', () => {
  const configOptions = {
    commands: ['test1', true, Symbol('test')]
  };

  const config = new Config(configOptions);
  expect(config.errors.length).toBe(3);
  expect(config.errors[0].message).toBe(VALID_COMMAND_ERROR_MESSAGE);
  expect(config.errors[0].level).toBe('error');
  expect(config.errors[0].type).toBe('validation-exception');
  expect(config.errors[1].message).toBe(VALID_COMMAND_ERROR_MESSAGE);
  expect(config.errors[1].level).toBe('error');
  expect(config.errors[1].type).toBe('validation-exception');
  expect(config.errors[2].message).toBe(VALID_COMMAND_ERROR_MESSAGE);
  expect(config.errors[2].level).toBe('error');
  expect(config.errors[2].type).toBe('validation-exception');
});

test('Config Model: Should handle errors from config commands', () => {
  const fakeError = Symbol('fakeError');

  ConfigCommands.mockImplementation(() => {
    return {
      warnings: [],
      errors: [fakeError]
    };
  });

  const configOptions = {
    commands: [
      {
        name: 'test',
        command: 'test command'
      }
    ]
  };

  const config = new Config(configOptions);

  expect(config.errors.length).toBe(1);
  expect(config.errors[0]).toBe(fakeError);
});

test('Config Model: Should handle warnings from config commands', () => {
  const fakeWarning = Symbol('fakeWarning');

  ConfigCommands.mockImplementation(() => {
    return {
      warnings: [fakeWarning],
      errors: []
    };
  });

  const configOptions = {
    commands: [
      {
        name: 'test',
        command: 'test command'
      }
    ]
  };

  const config = new Config(configOptions);

  expect(config.warnings.length).toBe(1);
  expect(config.warnings[0]).toBe(fakeWarning);
});
