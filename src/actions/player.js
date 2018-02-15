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

export const loadError = message => ({
  message,
  type: 'onLoadError',
});
