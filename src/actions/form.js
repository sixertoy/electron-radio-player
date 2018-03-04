export const formCreate = term => ({
  item: {
    key: '',
    name: '',
    url: term,
    website: '',
    type: 'radio',
    mtime: Date.now(),
    cover: {
      logo: '',
      color: '#FFFFFF', // default colors
      background: 'rgba(0, 0, 0, 0)', // defaults background
    },
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
