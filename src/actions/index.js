export const play = () => ({
  type: 'onPlay',
});

export const pause = () => ({
  type: 'onPause',
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

export const changeStation = station => ({
  station,
  type: 'onChangeStation',
});
