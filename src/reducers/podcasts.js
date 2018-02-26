// a collection of podcasts
// from one author (search or playlist)
export const podcasts = (state = [], action) => {
  switch (action.type) {
  case 'onClosePodcasts':
    return [];
  case 'onOpenPodcasts':
    return [].concat(action.podcasts);
  default:
    return state;
  }
};

export const episodes = (state = false, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
