# File Ops CLI

A basic Node.js CLI app for common file operations.

Included so far:

- Find and replace
- Prepending

## Installation

### Project-specific usage

```bash
npm install @nrademacher/file-ops-cli
```
### Global usage

```bash
npm install -g @nrademacher/file-ops-cli
```

## Usage

```bash
file-ops op=<op> <args> <file>
```

**Note:** Globbed file specifications (e.g. `*.js` or `src/**/*.js`) must be in quotes to prevent automatic glob expansion.

### Find and replace

```bash
file-ops fnr '<old>' '<new>' '<file>'
```


### Prepend

```bash
file-ops prepend '<text>' <flags> '<file>'
```

#### Flags

* `--unique`, `-u`
 * Will skip file if file already includes input string

### Append

```bash
file-ops append '<text>' <flags> '<file>'
```

#### Flags

* `--unique`, `-u`
 * Will skip file if file already includes input string

## TODO

- [ ] Add better and prettier logging
- [ ] Add quality-of-life CLI features
  - [ ] `--help` flag
- [ ] Add more operations
- [ ] Write tests

