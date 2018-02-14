export const searchpodcast = term => (dispatch) => {
  const uri = `https://itunes.apple.com/search?attribute=authorTerm&entity=podcast&term=${term}`;
  fetch(uri, {
    method: 'GET'
  })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};

export default searchpodcast;
