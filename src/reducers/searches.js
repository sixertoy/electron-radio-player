const searches = (state = [], action) => {
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

export default searches;
