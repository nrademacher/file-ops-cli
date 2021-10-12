# File Ops CLI

A basic Node.js CLI app for common file operations.

Included so far:

- Find and replace
- Prepending

## Installation

### Project-specific usage

```bash
npm install @nrademacher/prepend-cli
```
### Global usage

```bash
npm install -g @nrademacher/prepend-cli
```

## Usage

```bash
file-ops op=<op> <args> <file>
```

### Find and replace

```bash
file-ops op=fnr <old> <new> <file>
```

### Prepend

```bash
file-ops op=prepend <text> <file>
```

## TODO

- [ ] Add better and prettier logging
- [ ] Add quality-of-life CLI features
  - [ ] `--help` flag
- [ ] Add more operations
- [ ] Write tests

