import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { muted, paused, volume, source, buffering, buffererror } from './player';
import { playlist, playlistkeys } from './playlist';
import { episodes, podcasts } from './podcasts';
import { form } from './form';
import { term, results } from './search';

const editable = (state = false, action) => {
  switch (action.type) {
  case 'onToggleEditable':
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

const toasts = (state = [], action) => {
  switch (action.type) {
  case 'onAddToast':
    return state.concat([action.item]);
  case 'onRemoveToast':
    return state.filter(obj => obj.id !== action.id);
  default:
    return state;
  }
};

export const reducers = combineReducers({
  toasts,
  isonline,
  editable,
  // search
  form,
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
  buffering,
  buffererror,
  router: routerReducer,
});

export default reducers;
