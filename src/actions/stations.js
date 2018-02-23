export const removeStation = (item, count) => ({
  item,
  count,
  type: 'onRemoveStation',
});

export const subscribePodcast = podcast => ({
  podcast,
  type: 'onSubscribePodcast',
});

export const unsubscribePodcast = podcast => ({
  podcast,
  type: 'onUnubscribePodcast',
});
