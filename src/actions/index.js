export * from './search';
export * from './player';
export * from './volume';
export * from './stations';

export * from './services/searchpodcasts';

export const networkStatus = isonline => ({
  isonline,
  type: 'onNetworkStatus',
});

export const toggleRemovable = () => ({
  type: 'onToggleRemovable',
});
