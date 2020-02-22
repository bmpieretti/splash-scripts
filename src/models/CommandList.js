import deepmerge from 'deepmerge';
import ValidationException from '../exceptions/ValidationException';
import { VALID_CONFIGS_ERROR_MESSAGE } from '../configs/textEnums';

const validateConfigs = allConfigs => {
  const errors = [];
  if (!(Array.isArray(allConfigs) && allConfigs?.length)) {
    errors.push(new ValidationException(VALID_CONFIGS_ERROR_MESSAGE));
  }
  return errors;
};

const buildCommands = allConfigs => {
  const fullConfig = allConfigs.reduce((accumulator, currentConfig) => {
    return deepmerge(accumulator, currentConfig.preBuiltCommands);
  }, {});

  return Object.keys(fullConfig).reduce((accumulator, key) => {
    const DEFAULT_RESOLVER = 'npx';
    const configObject = fullConfig[key];
    const { resolve, command } = configObject;
    const fullCommand = `${
      !resolve || resolve === DEFAULT_RESOLVER ? `${DEFAULT_RESOLVER} ` : ''
    }${command}`;
    return [
      ...accumulator,
      {
        ...configObject,
        fullCommand,
        commandName: key
      }
    ];
  }, []);
};

export default class Config {
  originalConfigs = null;

  commands = [];

  errors = [];

  constructor(allConfigs) {
    this.originalConfigs = allConfigs;
    this.errors.push(...validateConfigs(allConfigs));
    if (this.errors?.length) return;
    this.commands = buildCommands(allConfigs);
  }
}
