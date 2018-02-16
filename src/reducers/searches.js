const searches = (state = [], action) => {
  switch (action.type) {
  case 'onSearching':
  case 'onSearchError':
    return [];
  case 'onSearchComplete':
    return [].concat(action.results.podcasts);
  default:
    return state;
  }
};

export default searches;
