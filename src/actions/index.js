export * from './form';
export * from './routes';
export * from './search';
export * from './player';
export * from './volume';
export * from './toaster';
export * from './stations';
export * from './podcasts';

export * from './services/searchPodcasts';
export * from './services/searchAuthorPodcasts';

export const networkStatus = isonline => ({
  isonline,
  type: 'onNetworkStatus',
});

export const toggleRemovable = () => ({
  type: 'onToggleRemovable',
});
