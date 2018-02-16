export const paused = (state = true, action) => {
  switch (action.type) {
  case 'onPause':
  case 'onLoadError':
    return true;
  case 'onPlay':
  case 'onResume':
    return false;
  default:
    return state;
  }
};

export const loaderror = (state = false, action) => {
  switch (action.type) {
  case 'onLoading':
    return false;
  case 'onLoadError':
    return action.message;
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
    return Object.assign({}, { ...action.source }, { ready: false });
  case 'onLoaded':
    return (state.ready)
      ? state : Object.assign({}, { ...state }, { ready: true });
  case 'onRemoveStation':
    return ((state && state.key) === action.item.key)
      ? null : state;
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
