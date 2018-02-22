const compose = (...fns) => fns.reverse()
  .reduce((prev, next) => value => next(prev(value)), value => value);

export default compose;
