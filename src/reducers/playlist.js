// stocke les cles des radios et podcasts
// pour faciliter la recherche dans les differents composants
export const playlistkeys = (state = [], action) => {
  switch (action.type) {
  default:
    return state;
  }
};

// liste des radios et podcasts
export const playlist = (state = [], action) => {
  switch (action.type) {
  case 'onRemoveStation':
    return state.filter(obj => action.key !== obj.key);
  case 'onFormCommit':
    return state.concat([action.item]);
  default:
    return state;
  }
};
