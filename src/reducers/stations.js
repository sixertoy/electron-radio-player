import presets from './_db';

import { slugify } from './../fp/slugify';

const newPodcast = props => ({
  type: 'podcast',
  mtime: Date.now(),
  name: props.artistName,
  key: slugify(props.artistName),
  channels: [{
    url: props.feedUrl,
    name: props.collectionName,
    key: slugify(props.collectionName),
    tags: props.genres.filter(val => val !== 'podcasts'),
    cover: { logo: props.artworkUrl600, background: '#000', color: '#FFF' },
  }],
});

const newRadio = props => ({
  type: 'radio',
  url: props.url,
  name: props.name,
  mtime: Date.now(),
  website: props.website,
  key: props.twiter || slugify(props.name),
  cover: { logo: props.artworkUrl600, background: '#000', color: '#FFF' },
});

// stocke les cles des radios et podcasts
// pour faciliter la recherche dans les differents composants
export const stationskeys = (state = [], action) => {
  let key = '';
  switch (action.type) {
  case 'onSubscribeToPodcast':
    key = slugify(action.podcast.artistName);
    return state.concat([key]);
  default:
    return state;
  }
};

// liste des radios et podcasts
export const stations = (state = presets, action) => {
  switch (action.type) {
  case 'onSubscribeToPodcast':
    return state.concat([newPodcast(action.podcast)]);
  case 'onRemoveStation':
    return state.filter(obj =>
      (obj.key !== action.item.key));
  default:
    return state;
  }
};

export default stations;
