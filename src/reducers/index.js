import { combineReducers } from 'redux';

import stations from './stations';

const volume = (state = 50, action) => {
  switch (action.type) {
  case 'onSetVolume':
    return action.volume;
  case 'onVolumeUp':
    return Math.min(100, (state + 5));
  case 'onVolumeDown':
    return Math.max(0, (state - 5));
  default:
    return state;
  }
};

export const station = (state = false, action) => {
  switch (action.type) {
  case 'onLoadError':
    return false;
  case 'onChangeStation':
    return action.station;
  default:
    return state;
  }
};

const isplaying = (state = false, action) => {
  switch (action.type) {
  case 'onPlay':
  case 'onLoaded':
    return true;
  case 'onPause':
  case 'onLoadError':
  case 'onChangeStation':
    return false;
  default:
    return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
  case 'onLoaded':
    return false;
  case 'onLoading':
    return false;
  case 'onLoadError':
    return false;
  default:
    return state;
  }
};

export const reducers = combineReducers({
  volume,
  station,
  loading,
  stations,
  isplaying,
});

export default reducers;
