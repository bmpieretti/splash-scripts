import fs from 'fs';
import path from 'path';

export const readFile = filename =>
  new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(process.cwd(), filename),
      'utf8',
      (error, data) => {
        if (error) reject(error);
        resolve(data);
      }
    );
  });

export const writeFile = (filename, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(process.cwd(), filename), data, 'utf8', error => {
      if (error) reject(new Error(error.message));
      resolve();
    });
  });
