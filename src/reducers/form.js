import { pick } from './../lib/pick';
import { validate } from './../lib/validate';
import { reset, validators } from './../validators/form';

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

export const formerrors = (state = reset, action) => {
  switch (action.type) {
  case 'onFormCreate':
    return Object.assign({}, pick(reset, ['name']));
  case 'onSearchClear':
    return Object.assign({}, reset);
  case 'onFormUpdate':
    // no cast, errors are read only an resetable
    return validate(action.item, validators);
  default:
    return state;
  }
};

export default form;
