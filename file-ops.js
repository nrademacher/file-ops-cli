#!/usr/bin/env node
import glob from 'glob';
import { readFileSync, openSync, writeSync, close } from 'fs';
import replace from 'replace';

const [, , opFlag, ...args] = process.argv;

const [, operation] = opFlag.split("=");

const target = args[args.length - 1];

console.log(operation, target)

glob(target, function (err, files) {
  if (err) {
    throw err;
  }

  return files.forEach(function (item, _index, _array) {
    switch (operation) {
      case 'fnr':
        const [regex, replacement] = args;

        console.log(item + ' found');
        console.log(readFileSync(item, 'utf8'));

        replace({
          regex,
          replacement,
          paths: [item],
          recursive: true,
          silent: true,
        });

        console.log('Replacement complete');
        console.log(readFileSync(item, 'utf8'));

        return 0;
      case 'prepend': {
        const [text] = args;

        const data = readFileSync(item);
        const fd = openSync(item, 'w+');
        const buffer = Buffer.from(text);

        writeSync(fd, buffer, 0, buffer.length, 0);
        writeSync(fd, data, 0, data.length, buffer.length);

        close(fd);

        return 0;
      }
      default:
        return 1;
    }
  });
});
