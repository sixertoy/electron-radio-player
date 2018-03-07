export const form = (state = {}, action) => {
  const time = Date.now();
  switch (action.type) {
  case 'onFormCommit':
  case 'onSearchClear':
    return {};
  case 'onFormUpdate':
    return Object.assign({}, state, action.item, { mtime: time });
  case 'onFormCreate':
    return Object.assign({}, action.item, { mtime: time, id: time });
  default:
    return state;
  }
};

export default form;
