import { createSelector } from 'reselect';

// application
import { groupby } from './../lib/groupby';

const subscriptions = state => state.subscriptions;

export const getPodcasts = createSelector(
  subscriptions,
  items => items.filter(obj => obj.type === 'podcast'),
  items => groupby(items, 'artistName'),
);

export const getStations = createSelector(
  subscriptions,
  items => items.filter(obj => obj.type === 'station'),
);

export const getPlaylist = createSelector();
