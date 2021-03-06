export * from './form';
export * from './routes';
export * from './search';
export * from './player';
export * from './volume';
export * from './toaster';
export * from './playlist';

export * from './services/searchPodcasts';
export * from './services/searchAuthorPodcasts';

export const networkStatus = isonline => ({
  isonline,
  type: 'onNetworkStatus',
});

export const toggleEditable = () => ({
  type: 'onToggleEditable',
});
