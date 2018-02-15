import { combineReducers } from 'redux';

import {
  muted,
  paused,
  volume,
  source,
  loading,
} from './player';
import stations from './stations';

const isoffline = (state = false, action) => {
  switch (action.type) {
  case 'onOfflineStatus':
    return action.isoffline;
  default:
    return state;
  }
};

export const reducers = combineReducers({
  isoffline,
  // player
  muted,
  paused,
  volume,
  source,
  loading,
  stations,
});

export default reducers;
