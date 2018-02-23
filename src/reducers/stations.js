import { slugify } from './../lib/slugify';

const defaults = {
  color: '#FFFFFF',
  background: 'rgba(0, 0, 0, 0)',
};

const createArtwork = (props) => {
  const size = '600x600';
  const base = 'http://placehold.it';
  const text = `text=${props.name || size}`;
  return `${base}/${size}/${props.background}/${props.color}/?${text}`;
};


const newPodcast = props => ({
  type: 'podcast',
  mtime: Date.now(),
  name: props.artistName,
  key: slugify(props.artistName),
  collection: [{
    url: props.feedUrl,
    name: props.collectionName,
    key: slugify(props.collectionName),
    tags: props.genres.filter(val => val !== 'podcasts'),
    cover: {
      color: props.colors || defaults.color,
      logo: props.artworkUrl600 || createArtwork(props),
      background: props.background || defaults.background,
    },
  }],
});

const newRadio = props => ({
  type: 'radio',
  url: props.url,
  name: props.name,
  mtime: Date.now(),
  website: props.website || '',
  key: props.twiter || slugify(props.name),
  cover: {
    logo: createArtwork(props),
    color: props.colors || defaults.color,
    background: props.background || defaults.background,
  },
});

// stocke les cles des radios et podcasts
// pour faciliter la recherche dans les differents composants
export const stationskeys = (state = [], action) => {
  let key = '';
  switch (action.type) {
  case 'onFormCommit':
    key = slugify(action.item.name);
    return state.concat([key]);
  case 'onSubscribePodcast':
    key = slugify(action.podcast.collectionName);
    return !state.includes(key) ? state
      : state.concat([key]);
  // case 'onUnsubscribePodcast':
  //   key = slugify(action.podcast.artistName);
  //   return state.concat([key]);
  default:
    return state;
  }
};

// liste des radios et podcasts
export const stations = (state = [], action) => {
  switch (action.type) {
  case 'onFormCommit':
    return state.concat([newRadio(action.item)]);
  case 'onSubscribePodcast':
    return state.concat([newPodcast(action.podcast)]);
  // case 'onUnsubscribePodcast':
  //   return state.concat([newPodcast(action.podcast)]);
  case 'onRemoveStation':
    return state.filter(obj =>
      (obj.key !== action.item.key));
  default:
    return state;
  }
};

export default stations;
