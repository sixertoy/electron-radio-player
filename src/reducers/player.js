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
    // called on station click
    return Object.assign({}, { ...action.source }, { ready: false });
  case 'onLoaded':
    // called when stream is loaded
    // on recree pas la reference si le streal a deja ete charge
    if (state.ready) return state;
    return Object.assign({}, { ...state }, { ready: true });
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
