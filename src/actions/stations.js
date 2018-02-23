export const removeStation = (item, count) => ({
  item,
  count,
  type: 'onRemoveStation',
});

export const subscribeToPodcast = podcast => ({
  podcast,
  type: 'onSubscribeToPodcast',
});
