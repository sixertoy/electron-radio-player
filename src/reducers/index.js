import { combineReducers } from 'redux';

import stations from './stations';

const volume = (state = 100, action) => {
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
  case 'onOfflineStatus':
    return false;
  default:
    return state;
  }
};

const isloading = (state = false, action) => {
  switch (action.type) {
  case 'onLoading':
    return true;
  case 'onLoaded':
  case 'onLoadError':
  case 'onOfflineStatus':
    return false;
  default:
    return state;
  }
};

const isoffline = (state = false, action) => {
  switch (action.type) {
  case 'onOfflineStatus':
    return action.isoffline;
  default:
    return state;
  }
};

export const reducers = combineReducers({
  volume,
  station,
  stations,
  isloading,
  isplaying,
  isoffline,
});

export default reducers;
