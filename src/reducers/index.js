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
import {
  subkeys,
  subscriptions,
} from './subscriptions';
import {
  form,
  searches,
} from './forms';

const removable = (state = false, action) => {
  switch (action.type) {
  case 'onUnsubscribeStation':
    return (state && (action.count > 0));
  case 'onToggleRemovable':
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
  isonline,
  removable,
  // search
  form,
  searches,
  // radios & podcasts
  subkeys,
  subscriptions,
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
