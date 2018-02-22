export const term = (state = '', action) => {
  switch (action.type) {
  case 'onSearchUpdate':
    return action.term;
  case 'onFormCommit':
    return '';
  default:
    return state;
  }
};

export const form = (state = {}, action) => {
  switch (action.type) {
  case 'onFormCommit':
    return {};
  case 'onFormUpdate':
    return Object.assign({}, state, action.item);
  case 'onFormCreate':
    return Object.assign({}, action.item);
  default:
    return state;
  }
};

export const searches = (state = {}, action) => {
  switch (action.type) {
  case 'onSearching':
  case 'onSearchError':
    return {};
  case 'onSearchComplete':
    return Object.assign({}, action.results);
  default:
    return state;
  }
};
