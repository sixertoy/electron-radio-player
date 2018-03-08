import { has } from './../lib/has';

export const validate = (form, validators) =>
  Object.keys(form)
    .map((key) => {
      if (!has(validators, key)) return false;
      const message = validators[key](form[key]);
      const result = (message && { [key]: message }) || false;
      return result;
    })
    .reduce((acc, obj) => (obj && Object.assign({}, acc, obj)) || acc, {}) || {};

export default validate;
