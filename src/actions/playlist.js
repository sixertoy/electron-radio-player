export const removeStation = id => ({
  id,
  type: 'onRemoveStation',
});

export const openPodcasts = podcasts => ({
  podcasts,
  type: 'onOpenPodcasts',
});

export const subscribePodcast = podcast => ({
  podcast,
  type: 'onSubscribePodcast',
});

export const unsubscribePodcast = podcast => ({
  podcast,
  type: 'onUnubscribePodcast',
});
