import chalk from 'chalk';

const getName = type => {
  const formattedType = type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
  return `${formattedType} Exception`;
};

class SplashScriptsException extends Error {
  constructor({ type, message, level }) {
    super(message);
    this.name = getName(type);
    this.type = type;
    this.level = level || 'error';
    const stackWrapper = level === 'warning' ? chalk.yellow : chalk.red;
    Error.captureStackTrace(this, SplashScriptsException);
    this.stack = stackWrapper(this.stack);
  }
}

export default SplashScriptsException;
