class SplashScriptsException extends Error {
  constructor(options) {
    const { type, message, level } = options || {};

    super(message);
    this.type = type || 'splash-scripts-exception';
    this.level = level || 'error';
    Error.captureStackTrace(this, SplashScriptsException);
  }
}

export default SplashScriptsException;
