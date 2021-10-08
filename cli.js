#!/usr/bin/env node
import meow from 'meow';
import { prepend } from './prepend';

const cli = meow(
  `
	Usage
	  $ prepend <input> <file>

`,
  {
    importMeta: import.meta,
  }
);

prepend(cli.input[0], cli.input[1]);
