/* eslint
  no-console: 0,
  no-underscore-dangle: 0 */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

// application
import { reducers } from './reducers';
import { logger } from './middlewares/logger';

// Il est important d'encapsuler la creation des stores
// dans une function pour les tests unitaires
export const configure = () => {
  // charge les states existants dans le localStorage
  const store = createStore(
    reducers,
    applyMiddleware(logger, thunk),
  );
  return store;
};

export default configure;
