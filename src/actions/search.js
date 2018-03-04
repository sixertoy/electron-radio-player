import { replace } from 'react-router-redux';
import { formCreate } from './form';

export const inputChange = term => ({
  term,
  type: 'onInputChange',
});

export const searchClear = () => ({
  type: 'onSearchClear',
});

export const searching = () => ({
  type: 'onSearching',
});

export const searchError = () => ({
  type: 'onSearchError',
});

export const searchComplete = results => ({
  results,
  type: 'onSearchComplete',
});

export const submitInput = () => (dispatch, getState) => {
  const { term, router } = getState();
  dispatch(formCreate(term));
  if (router.location === '/player/create') return;
  dispatch(replace('/player/create'));
};

export const clearSearch = () => (dispatch, getState) => {
  const { router } = getState();
  dispatch(searchClear());
  if (router.location === '/player') return;
  dispatch(replace('/player'));
};

/*
// Radios URI
// const radiosuri = 'http://marxoft.co.uk/api/cuteradio/searches';
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
fetch(radiosuri, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/www-form-urlencoded',
    Authorization: `Basic ${base64.encode('20341a0acc810e91ab9a25601dfc44f8: ')}`,
  },
}),
*/
