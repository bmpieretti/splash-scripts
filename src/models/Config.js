import ValidationException from '../exceptions/ValidationException';
import {
  EXTENDS_TYPING_ERROR_MESSAGE,
  VALID_CONFIG_STRUCTURE_ERROR_MESSAGE,
  VALID_COMMAND_ERROR_MESSAGE,
  MAX_DEPTH_ERROR_MESSAGE
} from '../configs/textEnums';
import ConfigCommands from './ConfigCommands';

const MAX_CONFIG_DEPTH = 100;

const validateConfigOptions = (preBuiltCommands, depth) => {
  const errors = [];
  const { extends: extendedConfigs, commands } = preBuiltCommands || {};

  if (!extendedConfigs && !commands?.length) {
    errors.push(new ValidationException(VALID_CONFIG_STRUCTURE_ERROR_MESSAGE));
  }

  if (
    extendedConfigs &&
    !(typeof extendedConfigs === 'string' || Array.isArray(extendedConfigs))
  ) {
    errors.push(new ValidationException(EXTENDS_TYPING_ERROR_MESSAGE));
  }

  if (commands) {
    commands.forEach(command => {
      if (typeof command !== 'object') {
        errors.push(new ValidationException(VALID_COMMAND_ERROR_MESSAGE));
      }
    });
  }

  if (typeof depth === 'number' && depth > MAX_CONFIG_DEPTH) {
    errors.push(new ValidationException(MAX_DEPTH_ERROR_MESSAGE));
  }

  return errors;
};

const handleExtends = extended => {
  if (!extended) return null;
  const extendsIsArray = Array.isArray(extended);
  return extendsIsArray ? extended : [extended];
};

export default class Config {
  originalConfig = null;

  preBuiltCommands = null;

  warnings = [];

  errors = [];

  extendsArg = null;

  constructor(config, path, depth) {
    this.originalConfig = config;
    this.path = path || process.cwd();
    this.errors.push(...validateConfigOptions(config, depth));
    if (this.errors?.length) return;
    this.extendsArg = handleExtends(config?.extends);
    const configCommands = new ConfigCommands(config.commands || [], this.path);
    this.preBuiltCommands = configCommands.preBuiltCommands;
    this.errors.push(...configCommands.errors);
    this.warnings.push(...configCommands.warnings);
  }
}
