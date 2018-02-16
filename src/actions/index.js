export * from './search';
export * from './player';
export * from './volume';

export const networkStatus = isonline => ({
  isonline,
  type: 'onNetworkStatus',
});
