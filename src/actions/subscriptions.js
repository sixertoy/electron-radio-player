export const unsubscribeStation = (item, count) => ({
  item,
  count,
  type: 'onUnsubscribeStation',
});

export const subscribePodcast = podcast => ({
  podcast,
  type: 'onSubscribePodcast',
});

export const unsubscribePodcast = podcast => ({
  podcast,
  type: 'onUnubscribePodcast',
});
