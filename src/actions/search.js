import { push } from 'react-router-redux';
import { searchQuery } from './../fp/searchquery';

const ITUNES_BASE_URI = 'https://itunes.apple.com/search';

const searching = () => ({
  type: 'onSearching',
});

const searchComplete = results => ({
  results,
  type: 'onSearchComplete',
});

const searchError = () => ({
  type: 'onSearchError',
});

/*
const gettoken = () => {
  // http://marxoft.co.uk/doc/cuteradio-api/
  // const form = new FormData();
  // form.append('username', 'user');
  // form.append('password', 'helloworld');
  // const uri = 'http://marxoft.co.uk/api/cuteradio/token';
  // fetch(uri, { body: form, method: 'POST', headers: new Headers({
  // 'Content-Type': 'application/www-form-urlencoded' }), }),
  // { "id":1662, "token":"20341a0acc810e91ab9a25601dfc44f8", "roles":"user" }
  return '20341a0acc810e91ab9a25601dfc44f8';
};
*/

export const searchAuthors = term => (dispatch) => {
  dispatch(searching());
  // Podcasts URI
  const params = searchQuery({
    term,
    limit: '200',
    country: 'FR',
    media: 'podcast',
    entity: 'podcastAuthor',
  });
  const route = `${ITUNES_BASE_URI}?${params}`;
  console.log('CALL: ', route);
  // Radios URI
  // const radiosuri = 'http://marxoft.co.uk/api/cuteradio/searches';
  Promise.all([
    fetch(route, { method: 'GET' }),
    /*
    fetch(radiosuri, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/www-form-urlencoded',
        Authorization: `Basic ${base64.encode('20341a0acc810e91ab9a25601dfc44f8: ')}`,
      },
    }),
    */
  ])
    .then(resps => Promise.all(resps.map(resp => resp.json())))
    .then(([podcasts]) => {
      console.log('podcasts.results', podcasts.results);
      dispatch(searchComplete(podcasts.results));
      dispatch(push('/search'));
    })
    .catch(err => dispatch(searchError(err)));
};

export default searchAuthors;
