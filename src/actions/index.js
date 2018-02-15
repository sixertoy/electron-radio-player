export * from './search';
export * from './player';
export * from './volume';

export const offlineStatus = isoffline => ({
  isoffline,
  type: 'onOfflineStatus',
});
