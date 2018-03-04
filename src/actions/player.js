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

export const buffered = () => ({
  type: 'onBuffered',
});

export const buffering = () => ({
  type: 'onBuffering',
});

export const bufferError = message => ({
  message,
  type: 'onBufferError',
});
