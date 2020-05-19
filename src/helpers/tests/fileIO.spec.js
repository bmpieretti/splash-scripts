import fs from 'fs';
import path from 'path';
import { chance } from '@splash-plus/jest-config';
import { readFile, writeFile } from '../fileIO';

jest.mock('fs');

beforeEach(() => {
  process.cwd = jest.fn().mockReturnValue('dirname/');
});

test('fileIO: File should resolve promise when successfully read', async () => {
  const dataSymbol = Symbol('data');
  const filename = `${chance.word()}.${chance.word()}`;

  fs.readFile.mockImplementation((file, option, cb) => cb(null, dataSymbol));

  const data = await readFile(filename);

  expect(data).toBe(dataSymbol);
  expect(fs.readFile).toHaveBeenCalledTimes(1);
  expect(fs.readFile).toHaveBeenCalledWith(
    path.resolve(process.cwd(), filename),
    'utf8',
    expect.any(Function)
  );
});

test('fileIO: File should reject promise when error occurs', async () => {
  const error = new Error('message');
  const dataSymbol = Symbol('data');
  const filename = `${chance.word()}.${chance.word()}`;

  fs.readFile.mockImplementation((file, option, cb) => cb(error, dataSymbol));

  await expect(readFile(filename)).rejects.toThrow(error);
});

test('fileIO: File should resolve promise when successfully written', async () => {
  const dataSymbol = Symbol('data');
  const filename = `${chance.word()}.${chance.word()}`;

  fs.writeFile.mockImplementation((file, data, option, cb) => cb(null));

  await writeFile(filename, dataSymbol);

  expect(fs.writeFile).toHaveBeenCalledTimes(1);
  expect(fs.writeFile).toHaveBeenCalledWith(
    path.resolve(process.cwd(), filename),
    dataSymbol,
    'utf8',
    expect.any(Function)
  );
});

test('fileIO: File should reject promise when file fails to write', async () => {
  const error = new Error('message');
  const dataSymbol = Symbol('data');
  const filename = `${chance.word()}.${chance.word()}`;

  fs.writeFile.mockImplementation((file, data, option, cb) => cb(error));

  await expect(writeFile(filename, dataSymbol)).rejects.toThrow(error);
});
