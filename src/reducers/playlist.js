/*
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
*/

// stocke les cles des radios et podcasts
// pour faciliter la recherche dans les differents composants
export const playlistkeys = (state = [], action) => {
  switch (action.type) {
  default:
    return state;
  }
};

// liste des radios et podcasts
export const playlist = (state = [], action) => {
  switch (action.type) {
  default:
    return state;
  }
};
