import { groupby } from './../../fp/groupby';
import { searchQuery } from './../../fp/searchquery';
import { searching, searchComplete, searchError } from './../search';

const ITUNES_BASE_URI = 'https://itunes.apple.com/search';

export const searchPodcasters = (term, country = 'FR') => (dispatch) => {
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
      const podcasters = groupby(results, 'artistName');
      dispatch(searchComplete({ podcasters }));
    })
    .catch(err => dispatch(searchError(err)));
};

export default searchPodcasters;
