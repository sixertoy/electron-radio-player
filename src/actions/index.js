export * from './search';
export * from './player';

export const offlineStatus = isoffline => ({
  isoffline,
  type: 'onOfflineStatus',
});
