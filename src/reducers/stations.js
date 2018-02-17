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
  channels: [{
    key: 'fip-electro',
    name: 'FIP Electro',
    type: 'radio',
    url: 'http://direct.fipradio.fr/live/fip-webradio8.mp3',
  }, {
    key: 'fip-rock',
    name: 'FIP Rock',
    type: 'radio',
    url: 'http://direct.fipradio.fr/live/fip-webradio1.mp3',
  }, {
    key: 'fip-jazz',
    name: 'FIP Jazz',
    type: 'radio',
    url: 'http://direct.fipradio.fr/live/fip-webradio2.mp3',
  }, {
    key: 'fip-groove',
    name: 'FIP Groove',
    type: 'radio',
    url: 'http://direct.fipradio.fr/live/fip-webradio3.mp3',
  }, {
    key: 'fip-world',
    name: 'FIP World',
    type: 'radio',
    url: 'http://direct.fipradio.fr/live/fip-webradio4.mp3',
  }, {
    key: 'fip-nouveaute',
    name: 'FIP Nouveauté',
    type: 'radio',
    url: 'http://direct.fipradio.fr/live/fip-webradio5.mp3',
  }, {
    key: 'fip-reggae',
    name: 'FIP Reggae',
    type: 'radio',
    url: 'http://direct.fipradio.fr/live/fip-webradio6.mp3',
  }],
}, {
  key: '@franceculture',
  name: 'France Culture',
  type: 'radio',
  website: 'https://www.franceculture.fr/direct',
  url: 'https://chai5she.cdn.dvmr.fr/franceculture-midfi.mp3?ID=radiofrance',
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
}];

const stations = (state = presets, action) => {
  switch (action.type) {
  case 'onAddStation':
    return state.concat([action.item]);
  case 'onRemoveStation':
    return state.filter(obj =>
      (obj.key !== action.item.key));
  default:
    return state;
  }
};

export default stations;
