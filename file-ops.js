#!/usr/bin/env node
import glob from 'glob';
import { readFileSync, openSync, writeSync, close } from 'fs';
import replace from 'replace';
import pc from 'picocolors';

const fileOps = glob;

const [, , operation, ...args] = process.argv;

const target = args[args.length - 1];

fileOps(target, function (err, files) {
  if (err) {
    throw err;
  }

  return files.forEach(function (file, index, _array) {
    switch (operation) {
      case 'fnr':
        const [regex, replacement] = args;

        console.log(file + ' found');
        console.log(readFileSync(file, 'utf8'));

        replace({
          regex,
          replacement,
          paths: [file],
          recursive: true,
          silent: true,
        });

        console.log(
          `${pc.green('Done.')} ${pc.bold(index + 1)} replacement${
            index + 1 >= 2 ? 's' : ''
          } performed`
        );

        return 0;
      case 'prepend': {
        const [text] = args;

        const data = readFileSync(file);
        const fd = openSync(file, 'w+');
        const buffer = Buffer.from(text);

        writeSync(fd, buffer, 0, buffer.length, 0);
        writeSync(fd, data, 0, data.length, buffer.length);

        close(fd);

        console.log(
          `${pc.green('Done.')} Prepended to ${pc.bold(index + 1)} file${
            index + 1 >= 2 ? 's' : ''
          }`
        );

        return 0;
      }
      default:
        return 1;
    }
  });
});
