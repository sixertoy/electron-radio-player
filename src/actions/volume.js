export const mute = () => ({
  type: 'onMute',
});
export const unmute = () => ({
  type: 'onUnmute',
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
