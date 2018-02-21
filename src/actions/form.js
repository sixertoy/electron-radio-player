export const formCreate = item => ({
  item,
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
