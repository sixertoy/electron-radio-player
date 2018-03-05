export const formCreate = term => ({
  item: {
    valid: false, // commitable flag
    key: '',
    logo: '',
    name: '',
    url: term,
    twitter: '',
    website: '',
    type: 'radio',
    color: '#FFFFFF', // default colors
    mtime: Date.now(),
    // default color used for cover background
    // should be picked from logo with an image color analysis
    background: '#000000',
  },
  type: 'onFormCreate',
});

export const formUpdate = item => ({
  item,
  type: 'onFormUpdate',
});

export const formCommit = item => ({
  item,
  type: 'onFormCommit',
});
