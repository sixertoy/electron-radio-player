import { replace } from 'react-router-redux';
import { searchQuery } from './../../fp/searchquery';
import { searching, searchComplete, searchError } from './../search';

const ITUNES_BASE_URI = 'https://itunes.apple.com/search';

export const searchPodcasters = (term, country = 'FR') => (dispatch) => {
  dispatch(searching());
  // Podcasts URI
  const params = searchQuery({
    term,
    country,
    limit: 20,
    media: 'podcast',
    entity: 'podcast',
    attribute: 'artistTerm',
  });
  const route = `${ITUNES_BASE_URI}?${params}`;
  Promise.all([
    fetch(route, { method: 'GET' }),
  ])
    .then(resps => Promise.all(resps.map(resp => resp.json())))
    .then(([podcastsauthors]) => {
      const results = {
        podcasts: podcastsauthors.results,
      };
      // console.log('results', results);
      dispatch(searchComplete(results));
      dispatch(replace('/player/searchresults'));
    })
    .catch(err => dispatch(searchError(err)));
};

export default searchPodcasters;

/*
export const searchPodcasts = term => (dispatch) => {
  dispatch(searching());
  // Podcasts URI
  const params = searchQuery({
    term,
    limit: '200',
    country: 'FR',
    media: 'podcast',
    entity: 'podcast',
    attribute: 'artistTerm',
  });
  const route = `${ITUNES_BASE_URI}?${params}`;
  console.log('route', route);
  Promise.all([
    fetch(route, { method: 'GET' }),
  ])
    .then(resps => Promise.all(resps.map(resp => resp.json())))
    .then(([podcasts]) => {
      console.log('podcasts', podcasts);
    })
    .catch(err => dispatch(searchError(err)));
};
*/
