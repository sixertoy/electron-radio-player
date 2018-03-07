export const paused = (state = true, action) => {
  switch (action.type) {
  case 'onPause':
  case 'onBufferError':
    return true;
  case 'onPlay':
  case 'onResume':
    return false;
  default:
    return state;
  }
};

export const buffererror = (state = false, action) => {
  switch (action.type) {
  case 'onBuffering':
    return false;
  case 'onBufferError':
    return action.message;
  default:
    return state;
  }
};

export const buffering = (state = false, action) => {
  switch (action.type) {
  case 'onBuffering':
    return true;
  case 'onBuffered':
  case 'onBufferError':
    return false;
  default:
    return state;
  }
};

export const source = (state = null, action) => {
  switch (action.type) {
  case 'onPlay':
    return Object.assign({}, { ...action.source });
  case 'onFormUpdate':
    return !state || state.id !== action.item.id ? state : Object.assign({}, { ...action.item });
  case 'onRemoveStation':
    return state && state.id === action.id ? null : source;
  default:
    return state;
  }
};

export const volume = (state = 100, action) => {
  let vol = state;
  switch (action.type) {
  case 'onSetVolume':
    vol = action.volume;
    break;
  case 'onVolumeUp':
    vol += 5;
    break;
  case 'onVolumeDown':
    vol -= 5;
    break;
  default:
    break;
  }
  return Math.min(Math.max(0, vol), 100);
};

export const muted = (state = false, action) => {
  switch (action.type) {
  case 'onMute':
    return true;
  case 'onUnmute':
    return false;
  default:
    return state;
  }
};
