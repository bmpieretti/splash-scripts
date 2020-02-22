import SplashScriptsException from './SplashScriptsException';
import { CONFIG_EXCEPTION_ERROR_MESSAGE } from '../configs/textEnums';

export default class ConfigException extends SplashScriptsException {
  constructor(error) {
    super({
      message: CONFIG_EXCEPTION_ERROR_MESSAGE(error.message),
      type: 'config-exception'
    });
  }
}
