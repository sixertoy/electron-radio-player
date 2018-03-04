import { replace } from 'react-router-redux';

export const gocreate = () => dispatch =>
  dispatch(replace('/player/create'));

export const gohome = () => dispatch =>
  dispatch(replace('/player'));
