import { chance } from '@splash-plus/jest-config';
import ValidationException from '../ValidationException';
import SplashScriptsException from '../SplashScriptsException';

test('ValidationException: Should init ValidationException with message and default type', () => {
  const message = chance.sentence();
  const validationException = new ValidationException(new Error(message));

  expect(validationException.level).toBe('error');
  expect(validationException.type).toBe('validation-exception');
  expect(validationException.message).toBe(`Error: ${message}`);
  expect(validationException).toBeInstanceOf(SplashScriptsException);
});

test('ValidationException: Should init ValidationException with message and isWarning type', () => {
  const message = chance.sentence();
  const validationException = new ValidationException(new Error(message), true);

  expect(validationException.level).toBe('warning');
  expect(validationException.type).toBe('validation-exception');
  expect(validationException.message).toBe(`Error: ${message}`);
  expect(validationException).toBeInstanceOf(SplashScriptsException);
});
