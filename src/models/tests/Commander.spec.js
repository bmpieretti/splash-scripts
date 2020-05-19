import { chance } from '@splash-plus/jest-config';
import Commander from '../Commander';

test('Commander Model: Should init Commander object with minimum vals', () => {
  const commanderObject = {
    unknownOptions: ''
  };

  const commander = new Commander(commanderObject);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe('');
});

test('Commander Model: Should init Commander object with commander unknownOptions', () => {
  const commanderObject = {
    unknownOptions: chance.sentence()
  };

  const commander = new Commander(commanderObject);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe(commanderObject.unknownOptions);
});

test('Commander Model: Should handle array of commander arguments passed', () => {
  const commanderObject = {
    unknownOptions: ''
  };

  const commanderArgs = ['', commanderObject];
  const commander = new Commander(commanderArgs);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe('');
});

test('Commander Model: Should join options when array of commander arguments passed', () => {
  const commanderObject = {
    unknownOptions: ''
  };

  const arg1 = chance.word();
  const arg2 = chance.word();

  const commanderArgs = [arg1, arg2, commanderObject];
  const commander = new Commander(commanderArgs);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe(`${arg1} ${arg2}`);
});

test('Commander Model: Should join both unknownOptions when array of commander arguments passed', () => {
  const commanderObject = {
    unknownOptions: chance.word()
  };

  const arg1 = chance.word();
  const arg2 = chance.word();

  const commanderArgs = [arg1, arg2, commanderObject];
  const commander = new Commander(commanderArgs);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe(
    `${commanderObject.unknownOptions} ${arg1} ${arg2}`
  );
});
