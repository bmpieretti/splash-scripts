import getProcessArgs from '../getProcessArgs';

test('ProcessArgs: Helper should return process argv', () => {
  const processArgs = getProcessArgs();

  expect(processArgs).toBe(process.argv);
});
