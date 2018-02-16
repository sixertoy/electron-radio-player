export * from './search';
export * from './player';
export * from './volume';

export const networkStatus = isonline => ({
  isonline,
  type: 'onNetworkStatus',
});

export const togglEditable = () => ({
  type: 'onTogglEditable',
});

export const removeStation = item => ({
  item,
  type: 'onRemoveStation',
});
