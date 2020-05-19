import { chance } from '@splash-plus/jest-config';
import ConfigException from '../ConfigException';
import SplashScriptsException from '../SplashScriptsException';
import { CONFIG_EXCEPTION_ERROR_MESSAGE } from '../../configs/textEnums';

test('ConfigException: Should init ConfigException with message and type', () => {
  const message = chance.sentence();
  const configException = new ConfigException(new Error(message));

  expect(configException.type).toBe('config-exception');
  expect(configException.message).toBe(CONFIG_EXCEPTION_ERROR_MESSAGE(message));
  expect(configException).toBeInstanceOf(SplashScriptsException);
});
