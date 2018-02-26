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
  playlist,
  playlistkeys,
} from './playlist';
import {
  episodes,
  podcasts,
} from './podcasts';
import { form } from './form';
import {
  term,
  results,
} from './search';

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
  form,
  isonline,
  removable,
  // search
  term,
  results,
  // radios & podcasts
  podcasts,
  episodes,
  playlist,
  playlistkeys,
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
