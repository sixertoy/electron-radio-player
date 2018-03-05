export const formCreate = (term) => {
  const time = Date.now();
  return {
    item: {
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
    },
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
