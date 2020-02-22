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
    unknownOptions: 'test test test'
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

  const commanderArgs = ['test', 'hello', commanderObject];
  const commander = new Commander(commanderArgs);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe('test hello');
});

test('Commander Model: Should join both unknownOptions when array of commander arguments passed', () => {
  const commanderObject = {
    unknownOptions: 'hello'
  };

  const commanderArgs = ['test', 'world', commanderObject];
  const commander = new Commander(commanderArgs);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe('hello test world');
});

test('Commander Model: Should join both unknownOptions when array of commander arguments passed', () => {
  const commanderObject = {
    unknownOptions: 'hello'
  };

  const commanderArgs = ['test', 'world', commanderObject];
  const commander = new Commander(commanderArgs);

  expect(commander.commander).toBe(commanderObject);
  expect(commander.unknownOptions).toBe('hello test world');
});
