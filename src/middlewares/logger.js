/* eslint
  no-console: 0 */
// https://redux.js.org/docs/advanced/Middleware.html

export const logger = store => next => (action) => {
  // console.log('dispatching', action);
  const result = next(action);
  // console.log('next state', store.getState());
  return result;
};

export default logger;
