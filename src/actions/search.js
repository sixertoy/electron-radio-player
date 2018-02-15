const searching = () => ({
  type: 'onSearching'
});

const searchComplete = () => ({
  type: 'onSearchComplete'
});

const searchError = () => ({
  type: 'onSearchError'
});

export const search = req => (dispatch) => {
  dispatch(searching());
  const baseuri = 'https://itunes.apple.com/search';
  const uri = `${baseuri}?${req}`;
  fetch(uri, { method: 'GET' })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};

export default search;
