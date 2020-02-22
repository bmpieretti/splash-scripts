import fs from 'fs';
import path from 'path';
import { readFile, writeFile } from '../fileIO';

test('fileIO: File should resolve promise when successfully read', async () => {
  expect.hasAssertions();

  const expectedJson = {
    hello: 'world'
  };

  const actualJson = await readFile('./src/helpers/tests/files/test.json');
  expect(JSON.parse(actualJson)).toEqual(expectedJson);
});

test('fileIO: File should reject promise when error occurs', async () => {
  expect.hasAssertions();

  try {
    await readFile('./test1.json');
  } catch (error) {
    expect(error).toBeTruthy();
  }
});

test('fileIO: File should resolve promise when successfully written', async () => {
  expect.hasAssertions();
  const filepath = './src/helpers/tests/files/test-write.json';

  const expectedData = {
    hello: 'world'
  };

  await writeFile(filepath, JSON.stringify(expectedData));

  const writtenData = await readFile(filepath);

  expect(JSON.parse(writtenData)).toEqual(expectedData);

  await fs.unlink(path.resolve(process.cwd(), filepath), () => null);
});

test('fileIO: File should reject promise when file fails to write', async () => {
  expect.hasAssertions();
  const filepath = '$src/helpers/tests/files/test-write1.json';

  try {
    await writeFile(filepath, null);
  } catch (error) {
    expect(error).toBeTruthy();
  }
});
