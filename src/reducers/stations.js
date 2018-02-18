import { slugify } from './../fp/slugify';

const presets = [{
  key: '@fipradio',
  name: 'FIP et c\'est une radio super cool parce qu\'il passe pas de pubs',
  type: 'radio',
  website: 'https://www.fip.fr/player',
  url: 'http://direct.fipradio.fr/live/fip-midfi.mp3',
  cover: {
    color: '#E2007A',
    background: '#E2007A',
    logo: `
      https://upload.wikimedia.org/wikipedia/fr/thumb/d/d5/FIP_logo_2005.svg/1200px-FIP_logo_2005.svg.png
    `,
  },
}, {
  key: '@franceculture',
  name: 'France Culture',
  type: 'radio',
  website: 'https://www.franceculture.fr/direct',
  url: 'https://chai5she.cdn.dvmr.fr/franceculture-midfi.mp3',
  cover: {
    color: '#773594',
    logo: `
      https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/France_Culture_logo_2005.svg/600px-France_Culture_logo_2005.svg.png
    `,
  },
}, {
  key: '@radiomeuh',
  name: 'Radio Meuh',
  type: 'radio',
  url: 'https://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3',
  cover: {
    color: '#FFFFFF',
    logo: `
      https://i2.wp.com/www.radiomeuh.com/wp-content/uploads/2015/10/cropped-favicon1.png?fit=512,512
    `,
  },
}, {
  key: '@laradionova',
  name: 'Radio Nova',
  type: 'radio',
  url: 'http://novazz.ice.infomaniak.ch/novazz-128.mp3',
  cover: {
    color: '#F85453',
    background: '#F85453',
    logo: 'http://www.nova.fr/sites/default/files/CQCT/default.jpg',
  },
}, {
  key: '@jaimejouercast',
  name: 'J\'aime Jouer',
  type: 'podcast',
  url: 'http://jaimejouer.lepodcast.fr/rss',
  cover: {
    color: '#00A6E3',
    background: '#00A6E3',
    logo: 'http://jaimejouer.lepodcast.fr/uploads/feed/cover/medium_cover_5886348a6e73343401a97600.jpg',
  },
}];

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

export const stations = (state = presets, action) => {
  switch (action.type) {
  case 'onCommitForm':
    return state.concat([Object.assign({}, action.item, {
      key: slugify(action.item.twitter || action.item.name),
    })]);
  case 'onRemoveStation':
    return state.filter(obj =>
      (obj.key !== action.item.key));
  default:
    return state;
  }
};
