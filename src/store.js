/* eslint
  no-console: 0,
  no-underscore-dangle: 0 */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';

// application
import { reducers } from './reducers';
import { logger } from './middlewares/logger';
import { createStorage } from './persists-storage';

const persistConfig = {
  storage: createStorage(),
  key: 'electron-radio-player',
  whitelist: [
    'stations',
    'stationskeys',
  ],
};

// Il est important d'encapsuler la creation des stores
// dans une function pour les tests unitaires
export const configure = (history) => {
  const router = routerMiddleware(history);
  // charge les states existants dans le localStorage
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = createStore(
    persistedReducer,
    applyMiddleware(logger, thunk, router),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configure;
