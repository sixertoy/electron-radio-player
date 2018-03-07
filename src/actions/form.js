import { replace } from 'react-router-redux';

export const formCreate = (term) => {
  const time = Date.now();
  const item = {
    valid: false, // commitable flag
    logo: '',
    name: '',
    url: term,
    twitter: '',
    website: '',
    type: 'radio',
    color: '#FFFFFF', // default colors
    key: time,
    mtime: time,
    // default color used for cover background
    // should be picked from logo with an image color analysis
    background: '#000000',
  };
  return {
    item,
    type: 'onFormCreate',
  };
};

export const formUpdate = item => ({
  item,
  type: 'onFormUpdate',
});

export const formCommit = item => ({
  item,
  type: 'onFormCommit',
});

export const formEdit = item => (dispatch) => {
  dispatch(formUpdate(item));
  dispatch(replace('/player/create'));
};
