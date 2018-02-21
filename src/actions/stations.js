export const removeStation = item => ({
  item,
  type: 'onRemoveStation',
});

export const subscribeToPodcast = podcast => ({
  podcast,
  type: 'onSubscribeToPodcast',
});
