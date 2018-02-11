/* global window */
/* eslint
  no-console: 0,
  no-underscore-dangle: 0 */
import { createStore } from 'redux';

// application
import { reducers } from './reducers';

/**
 * Il est important d'encapsuler la creation des stores
 * dans une function pour les tests unitaires
 */
export const configure = () => {
  // charge les states existants dans le localStorage
  const store = createStore(reducers);
  return store;
};

export default configure;
