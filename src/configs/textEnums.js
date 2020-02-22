export const EXTENDS_TYPING_ERROR_MESSAGE =
  'Option extends failed for config, as extends must be a string or array.';

export const VALID_CONFIG_STRUCTURE_ERROR_MESSAGE =
  'Config failed as at least one extended config or one command must be defined in the config.';

export const VALID_COMMAND_ERROR_MESSAGE = `Config command failed for one of the commands, as the command must be a object.`;

export const VALID_COMMAND_NAME_ERROR_MESSAGE =
  'Options failed for command, as a string name must be defined in a command object';

export const VALID_COMMAND_FIELD_ERROR_MESSAGE = name =>
  `Options failed for ${name}, as a string command must be defined in a top level command`;

export const VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE = name =>
  `Option description for ${name} not was not given, documenting your commands is recommended :)`;

export const VALID_COMMAND_RESOLVE_OPTIONS_ERROR_MESSAGE = (
  name,
  resolve,
  resolveOptions
) =>
  `Option resolve failed for ${name}, as only ${JSON.stringify(
    resolveOptions
  )} are supported, while ${resolve} was provided`;

export const VALID_CONFIGS_ERROR_MESSAGE =
  'No configs were found in the project. Please define a splash.config.js,' +
  'or for a list of other alternatives see the cosmicconfig documentation here: ' +
  'https://github.com/davidtheclark/cosmiconfig';

export const MAX_DEPTH_ERROR_MESSAGE =
  "Max number of 100 nested configs reached, you may want to double check to make sure you aren't recursively extending configs.";

export const CONFIG_EXCEPTION_ERROR_MESSAGE = message =>
  `Config parsing failed with message: ${message}`;

export const UNKNOWN_COMMAND_ERROR_MESSAGE = command =>
  `Unknown Command ${command}, try running splash-scripts --help to check if the command is valid and defined in your configs`;
