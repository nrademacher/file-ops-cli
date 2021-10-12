import { readFileSync } from 'fs';
import replace from 'replace';

export function findAndReplace(file, regex, replacement) {
  console.log(file + ' found');
  console.log(readFileSync(file, 'utf8'));

  replace({
    regex,
    replacement,
    paths: [file],
    recursive: true,
    silent: true,
  });

  console.log('Replacement complete');
  console.log(readFileSync(item, 'utf8'));
}
