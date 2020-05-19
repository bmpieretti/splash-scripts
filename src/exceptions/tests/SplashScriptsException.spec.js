import { chance } from '@splash-plus/jest-config';
import SplashScriptsException from '../SplashScriptsException';

beforeEach(() => {
  jest.clearAllMocks();
});

test('SplashScriptsException: Should init SplashScriptsException with message and default type', () => {
  Error.captureStackTrace = jest.fn();
  const splashScriptsException = new SplashScriptsException();

  expect(splashScriptsException.type).toBe('splash-scripts-exception');
  expect(splashScriptsException.level).toBe('error');
  expect(splashScriptsException.message).toBeFalsy();
  expect(Error.captureStackTrace).toHaveBeenCalledTimes(1);
  expect(Error.captureStackTrace).toHaveBeenCalledWith(
    splashScriptsException,
    SplashScriptsException
  );
  expect(splashScriptsException).toBeInstanceOf(Error);
});

test('SplashScriptsException: Should init SplashScriptsException with custom message', () => {
  const message = chance.sentence();
  const splashScriptsException = new SplashScriptsException({ message });

  expect(splashScriptsException.type).toBe('splash-scripts-exception');
  expect(splashScriptsException.level).toBe('error');
  expect(splashScriptsException.message).toBe(message);
  expect(Error.captureStackTrace).toHaveBeenCalledTimes(1);
});

test('SplashScriptsException: Should init SplashScriptsException with custom type', () => {
  const type = chance.sentence();
  const splashScriptsException = new SplashScriptsException({ type });

  expect(splashScriptsException.type).toBe(type);
  expect(splashScriptsException.level).toBe('error');
  expect(splashScriptsException.message).toBeFalsy();
  expect(Error.captureStackTrace).toHaveBeenCalledTimes(1);
});

test('SplashScriptsException: Should init SplashScriptsException with custom level', () => {
  const level = chance.word();
  const splashScriptsException = new SplashScriptsException({ level });

  expect(splashScriptsException.type).toBe('splash-scripts-exception');
  expect(splashScriptsException.level).toBe(level);
  expect(splashScriptsException.message).toBeFalsy();
  expect(Error.captureStackTrace).toHaveBeenCalledTimes(1);
});
