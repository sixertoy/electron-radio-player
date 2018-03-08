import { replace } from 'react-router-redux';

export const formCreate = (term) => {
  const item = {
    valid: false, // commitable flag
    logo: '',
    name: '',
    url: term,
    twitter: '',
    website: '',
    type: 'radio',
    color: '#FFFFFF', // default colors
    // default color used for cover background
    // should be picked from logo with an image color analysis
    background: '#000000',
  };
  return {
    item,
    type: 'onFormCreate',
  };
};

export const formCommit = item => ({
  item,
  type: 'onFormCommit',
});

export const formUpdate = form => ({
  type: 'onFormUpdate',
  item: Object.assign({}, form),
});

export const formEdit = item => (dispatch) => {
  dispatch(formUpdate(item));
  dispatch(replace('/player/create'));
};
