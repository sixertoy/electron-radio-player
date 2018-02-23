export const removeStation = (item, count) => ({
  item,
  count,
  type: 'onRemoveStation',
});

export const openPodcaster = collection => ({
  collection,
  type: 'onOpenPodcaster',
});

export const subscribeToPodcast = podcast => ({
  podcast,
  type: 'onSubscribeToPodcast',
});
