import { readFileSync, openSync, writeSync, close } from 'fs';

export function prepend(file, text) {
  const data = readFileSync(file);
  const fd = openSync(file, 'w+');
  const buffer = Buffer.from(text);

  writeSync(fd, buffer, 0, buffer.length, 0);
  writeSync(fd, data, 0, data.length, buffer.length);

  close(fd);
}
