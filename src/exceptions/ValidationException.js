import SplashScriptsException from './SplashScriptsException';

export default class ValidationException extends SplashScriptsException {
  constructor(message, isWarning) {
    super({
      message,
      type: 'validation-exception',
      level: isWarning ? 'warning' : null
    });
  }
}
