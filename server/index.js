/**
 * INSTALL:
 * ----
 * > yarn add express request
 *
 * RUN:
 * ----
 * > node ./audio-proxy-server
 */
const os = require('os');
const dns = require('dns');
const express = require('express');
const request = require('request');
const Throttle = require('throttle');

const app = express();
const hostname = os.hostname();

// defined in .env file
const serverport = (process.env.PORT || 3000);

// Any streaming radio URI
const radiouri = 'https://chai5she.cdn.dvmr.fr/fip-midfi.mp3';
// const radiouri = 'http://novazz.ice.infomaniak.ch/novazz-128.mp3';

app.get('/', (req, res) => {
  process.stdout.write('Connected to server\n');
  const throttle = new Throttle({
    chunk: 100,
    bps: 128 * 1024,
    // The maximum number of bytes to store in the internal buffer
    // before ceasing to read from the underlying resource
    highWaterMark: 512,
  });
  request.get(radiouri)
    .on('error', err => console.log('err', err))
    .on('response', () => {
      // console.log('resp', resp);
      // nova => resp.headers['icy-name']
      // nova => resp.headers['icy-description']
    })
    .pipe(throttle)
    .pipe(res);
});

app.listen(serverport, () => {
  dns.lookup(hostname, (err, ip) => {
    // retrieve network local ip
    process.stdout.write('Audio Proxy Server runs under\n');
    process.stdout.write(`  Local:        http://locahost:${serverport}\n`);
    process.stdout.write(`  Home Network: http://${ip}:${serverport}\n`);
  });
});
