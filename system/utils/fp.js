const compose = (...fns) => fns.reverse()
  .reduce((prev, next) => value => next(prev(value)), value => value);

// FIFO
const pipe = (...fns) =>
  compose.apply(compose, fns.reverse());

module.exports = { compose, pipe };
