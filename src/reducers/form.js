export const form = (state = {}, action) => {
  switch (action.type) {
  case 'onFormCommit':
  case 'onSearchClear':
    return {};
  case 'onFormUpdate':
    return Object.assign({}, state, action.item);
  case 'onFormCreate':
    return Object.assign({}, action.item);
  default:
    return state;
  }
};

export default form;
