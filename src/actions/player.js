export const play = source => ({
  source,
  type: 'onPlay',
});

export const pause = () => ({
  type: 'onPause',
});

export const resume = () => ({
  type: 'onResume',
});

export const loaded = () => ({
  type: 'onLoaded',
});

export const loading = () => ({
  type: 'onLoading',
});

export const loadError = () => ({
  type: 'onLoadError',
});

export const setVolume = volume => ({
  volume,
  type: 'onSetVolume',
});

export const increaseVolume = () => ({
  type: 'onVolumeUp',
});

export const decreaseVolume = () => ({
  type: 'onVolumeDown',
});
