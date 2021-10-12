#!/usr/bin/env node
import glob from 'glob';
import { findAndReplace, prepend } from './lib';

const [, , opFlag, ...args] = process.argv;

const [, operation] = opFlag;

const target = args[args.length - 1];

glob(target, function (err, files) {
  if (err) {
    throw err;
  }

  return files.forEach(function (file, _index, _array) {
    switch (operation) {
      case 'fnr':
        const [regex, replacement] = args;

        findAndReplace(file, regex, replacement);

        return 0;
      case 'prepend': {
        const [text] = args;

        prepend(file, text);

        return 0;
      }
      default:
        return 1;
    }
  });
});
