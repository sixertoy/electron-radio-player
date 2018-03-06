import compose from './compose';

const removesearch = url =>
  (url && typeof url === 'string' && url !== '' && url.split('?')[0]) || false;

export const isURI = (str) => {
  const matches = str.match(/^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/);
  return (matches && matches[0]) || false;
};

export const isRadio = str =>
  compose(url => (url && url.substr(-4) === '.mp3' && url) || false, removesearch, isURI)(str);

export const isPodcast = str =>
  compose(
    url => (url && (str.substr(-4) === '.xml' || str.substr(-3) === 'rss') && url) || false,
    removesearch,
    isURI,
  )(str);
