export const term = (state = '', action) => {
  switch (action.type) {
  case 'onSearchClear':
    return '';
  case 'onInputChange':
    return action.term;
  default:
    return state;
  }
};

export const results = (state = [], action) => {
  switch (action.type) {
  case 'onSearching':
  case 'onSearchError':
    return [];
  case 'onSearchComplete':
    return [].concat(action.results);
  default:
    return state;
  }
};

export default results;
