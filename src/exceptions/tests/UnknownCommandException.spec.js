import { chance } from '@splash-plus/jest-config';
import UnknownCommandException from '../UnknownCommandException';
import SplashScriptsException from '../SplashScriptsException';
import { UNKNOWN_COMMAND_ERROR_MESSAGE } from '../../configs/textEnums';

test('UnknownCommandException: Should init UnknownCommandException with message and type', () => {
  const message = chance.sentence();
  const unknownCommandException = new UnknownCommandException(message);

  expect(unknownCommandException.type).toBe('unknown-command-exception');
  expect(unknownCommandException.message).toBe(
    UNKNOWN_COMMAND_ERROR_MESSAGE(message)
  );
  expect(unknownCommandException).toBeInstanceOf(SplashScriptsException);
});
