export const paused = (state = true, action) => {
  switch (action.type) {
  case 'onPause':
    return true;
  case 'onPlay':
  case 'onResume':
  case 'onLoaded':
    return false;
  default:
    return state;
  }
};

export const loading = (state = false, action) => {
  switch (action.type) {
  case 'onLoading':
    return true;
  case 'onLoaded':
  case 'onLoadError':
    return false;
  default:
    return state;
  }
};

export const source = (state = null, action) => {
  switch (action.type) {
  case 'onPlay':
    return action.source;
  default:
    return state;
  }
};

export const volume = (state = 100, action) => {
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
