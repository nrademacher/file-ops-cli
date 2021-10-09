#!/usr/bin/env node
import { close, openSync, readFileSync, writeSync } from 'fs';

function prepend() {
  const text = process.argv[2];
  const file = process.argv[3];

  const data = readFileSync(file);
  const fd = openSync(file, 'w+');
  const buffer = Buffer.from(text);

  writeSync(fd, buffer, 0, buffer.length, 0);
  writeSync(fd, data, 0, data.length, buffer.length);

  close(fd);

  return 0;
}

prepend();
