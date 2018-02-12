const net = require('net');
const { spawn } = require('child_process');

let electronStarted = false;
const watcher = new net.Socket();

// Webpack Server URL
// Started as first process by foreman using port 3000 by default
// Foreman will start Runner Script on port 3100
const port = (process.env.PORT && (process.env.PORT - 100)) || 3000;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;

// FILO
const compose = (...fns) => fns.reverse()
  .reduce((prev, next) => value => next(prev(value)), value => value);

const cleanify = str =>
  str.replace(/(\n|\r)+$/, '').trim();

const bufferToString = data =>
  Buffer.from(data).toString();

const waitForWebpack = () => watcher.connect({ port }, () => {
  watcher.end();
  if (!electronStarted) {
    process.stdout.write('Running electron application!');
    electronStarted = true;
    const command = spawn('npm', ['run', 'electron']);
    // debug electron process
    command.stdout.on('data', compose(msg =>
      process.stdout.write(`\x1b[90m${msg}\x1b[0m`), cleanify, bufferToString));
    command.stderr.on('data', compose(msg =>
      process.stderr.write(`\x1b[31m${msg}\x1b[0m`), cleanify, bufferToString));
  }
});

watcher.on('error', () =>
  setTimeout(waitForWebpack, 1000));

waitForWebpack();
