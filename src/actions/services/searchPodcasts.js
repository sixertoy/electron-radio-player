import { searchQuery } from './../../lib/searchquery';
import { searching, searchComplete, searchError } from './../search';

const ITUNES_BASE_URI = 'https://itunes.apple.com/search';

export const searchPodcasts = (term, country = 'FR') => (dispatch) => {
  dispatch(searching());
  // Podcasts URI
  const params = searchQuery({
    term,
    country,
    limit: 200,
    media: 'podcast',
    entity: 'podcast',
    attribute: 'artistTerm',
  });
  const route = `${ITUNES_BASE_URI}?${params}`;
  Promise.all([
    fetch(route, { method: 'GET' }),
  ])
    .then(resps => Promise.all(resps.map(resp => resp.json())))
    .then(([{ results }]) => {
      dispatch(searchComplete(results));
    })
    .catch(err => dispatch(searchError(err)));
};

export default searchPodcasts;
