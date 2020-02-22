import ValidationException from '../exceptions/ValidationException';
import {
  VALID_COMMAND_NAME_ERROR_MESSAGE,
  VALID_COMMAND_FIELD_ERROR_MESSAGE,
  VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE,
  VALID_COMMAND_RESOLVE_OPTIONS_ERROR_MESSAGE
} from '../configs/textEnums';
import resolveOptions from '../configs/resolveOptions';

const validateCommandOptions = commandOptions => {
  const { name, command, resolve, description } = commandOptions;
  const errors = [];
  const warnings = [];

  if (!name || typeof name !== 'string') {
    errors.push(new ValidationException(VALID_COMMAND_NAME_ERROR_MESSAGE));

    return [warnings, errors];
  }

  if (!command || typeof command !== 'string') {
    errors.push(
      new ValidationException(VALID_COMMAND_FIELD_ERROR_MESSAGE(name))
    );
  }

  if (!description || typeof description !== 'string') {
    warnings.push(
      new ValidationException(
        VALID_COMMAND_DESCRIPTION_WARNING_MESSAGE(name),
        true
      )
    );
  }

  if (resolve && !resolveOptions.includes(resolve)) {
    errors.push(
      new ValidationException(
        VALID_COMMAND_RESOLVE_OPTIONS_ERROR_MESSAGE(
          name,
          resolve,
          resolveOptions
        )
      )
    );
  }

  return [warnings, errors];
};

export default class ConfigCommands {
  preBuiltCommands = null;

  errors = [];

  warnings = [];

  constructor(commands, path) {
    this.preBuiltCommands = {};

    const commandsArray = commands.map(command => ({
      path,
      ...command
    }));

    this.preBuiltCommands = commandsArray.reduce((accumulator, commandObj) => {
      const [warnings, errors] = validateCommandOptions(commandObj);
      const { name, ...options } = commandObj;

      this.warnings.push(...warnings);
      this.errors.push(...errors);

      return {
        ...accumulator,
        [name]: options
      };
    }, {});
  }
}
