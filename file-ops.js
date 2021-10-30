#!/usr/bin/env node
import glob from 'glob';
import { readFileSync, openSync, writeSync, appendFileSync, close } from 'fs';
import replace from 'replace';
import pc from 'picocolors';

const fileOps = glob;

const [, , operation, ...args] = process.argv;

const target = args[args.length - 1];

fileOps(target, function (err, files) {
  if (err) {
    throw err;
  }

  let processedCount = 0;

  return files.forEach(function (file, index, array) {
    switch (operation) {
      case 'fnr':
        console.log(`Replacing in ${pc.bold(file)}...`);

        const [regex, replacement] = args;

        replace({
          regex,
          replacement,
          paths: [file],
          recursive: true,
          silent: true,
        });

        processedCount += 1;

        if (!array[index + 1]) {
          console.log(
            `${pc.green('Done.')} ${pc.bold(processedCount)} replacement${
              processedCount >= 2 || processedCount === 0 ? 's' : ''
            } performed`
          );
        }

        return 0;
      case 'prepend': {
        const [text, ...flags] = args;

        const data = readFileSync(file);

        if (flags.includes('--unique') || flags.includes('-u')) {
          if (data.toString().includes(text)) {
            return 0;
          }
        }

        console.log(`Prepending to ${pc.bold(file)}...`);

        const fd = openSync(file, 'w+');
        const buffer = Buffer.from(text);

        writeSync(fd, buffer, 0, buffer.length, 0);
        writeSync(fd, data, 0, data.length, buffer.length);

        close(fd);

        processedCount += 1;

        if (!array[index + 1]) {
          console.log(
            `${pc.green('Done.')} Prepended to ${pc.bold(processedCount)} file${
              processedCount >= 2 || processedCount === 0 ? 's' : ''
            }`
          );
        }

        return 0;
      }
      case 'append': {
        const [text, ...flags] = args;

        const data = readFileSync(file);

        if (flags.includes('--unique') || flags.includes('-u')) {
          if (data.toString().includes(text)) {
            return 0;
          }
        }

        console.log(`Appending to ${pc.bold(file)}...`);

        let appendCount = 0;

        appendFileSync(file, text);

        processedCount += 1;

        if (!array[index + 1]) {
          console.log(
            `${pc.green('Done.')} Appended to ${pc.bold(processedCount)} file${
              processedCount >= 2 || processedCount === 0 ? 's' : ''
            }`
          );
        }

        return 0;
      }
      default:
        return 1;
    }
  });
});
