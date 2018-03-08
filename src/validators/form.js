import { isRadio } from './../lib/isurl';

export const reset = {
  url: 'Should be a valid URL',
  name: 'Should be a valid name',
};

export const validators = {
  url: val => !isRadio(val) && reset.url,
  name: val => (typeof val !== 'string' || val.trim() === '') && reset.name,
};
