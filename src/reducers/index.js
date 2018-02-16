import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  muted,
  paused,
  volume,
  source,
  loading,
  loaderror,
} from './player';
import searches from './searches';
import stations from './stations';

const editable = (state = false, action) => {
  switch (action.type) {
  case 'onTogglEditable':
    return !state;
  default:
    return state;
  }
};

const isonline = (state = false, action) => {
  switch (action.type) {
  case 'onNetworkStatus':
    return action.isonline;
  default:
    return state;
  }
};

export const reducers = combineReducers({
  searches,
  stations,
  isonline,
  editable,
  // player
  muted,
  paused,
  volume,
  source,
  loading,
  loaderror,
  router: routerReducer,
});

export default reducers;
