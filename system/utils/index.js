const noop = require('./noop');
const logger = require('./logger');
const isdarwin = require('./isdarwin');
const getasset = require('./getasset');
const usedebug = require('./usedebug');
const isdevelopment = require('./isdevelopment');

module.exports = {
  noop,
  logger,
  getasset,
  isdarwin,
  usedebug,
  isdevelopment,
};
