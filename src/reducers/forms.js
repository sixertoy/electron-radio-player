export const createform = (state = null, action) => {
  switch (action.type) {
  case 'onCommitForm':
    return {};
  case 'onCreateForm':
    return action.item;
  default:
    return state;
  }
};

export default createform;
