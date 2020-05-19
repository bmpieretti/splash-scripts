import SplashScriptsException from './SplashScriptsException';
import { UNKNOWN_COMMAND_ERROR_MESSAGE } from '../configs/textEnums';

export default class UnknownCommandException extends SplashScriptsException {
  constructor(command) {
    super({
      message: UNKNOWN_COMMAND_ERROR_MESSAGE(command),
      type: 'unknown-command-exception'
    });
  }
}
