const presets = [{
  key: '@fipradio',
  name: 'FIP',
  website: 'https://www.fip.fr/player',
  url: 'http://direct.fipradio.fr/live/fip-midfi.mp3',
  cover: {
    color: '#E2007A',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d5/FIP_logo_2005.svg/1200px-FIP_logo_2005.svg.png',
  },
  channels: [{
    key: 'fip-electro',
    name: 'FIP Electro',
    url: 'http://direct.fipradio.fr/live/fip-webradio8.mp3',
  }, {
    key: 'fip-rock',
    name: 'FIP Rock',
    url: 'http://direct.fipradio.fr/live/fip-webradio1.mp3',
  }, {
    key: 'fip-jazz',
    name: 'FIP Jazz',
    url: 'http://direct.fipradio.fr/live/fip-webradio2.mp3',
  }, {
    key: 'fip-groove',
    name: 'FIP Groove',
    url: 'http://direct.fipradio.fr/live/fip-webradio3.mp3',
  }, {
    key: 'fip-world',
    name: 'FIP World',
    url: 'http://direct.fipradio.fr/live/fip-webradio4.mp3',
  }, {
    key: 'fip-nouveaute',
    name: 'FIP Nouveauté',
    url: 'http://direct.fipradio.fr/live/fip-webradio5.mp3',
  }, {
    key: 'fip-reggae',
    name: 'FIP Reggae',
    url: 'http://direct.fipradio.fr/live/fip-webradio6.mp3',
  }],
}, {
  key: '@franceculture',
  name: 'France Culture ccu tuturre culreture',
  website: 'https://www.franceculture.fr/direct',
  url: 'https://chai5she.cdn.dvmr.fr/franceculture-midfi.mp3?ID=radiofrance',
  cover: {
    color: '#773594',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/France_Culture_logo_2005.svg/600px-France_Culture_logo_2005.svg.png',
  },
}, {
  key: '@radiomeuh',
  name: 'Radio Meuh',
  url: 'https://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3',
  cover: {
    color: '#FFFFFF',
    logo: 'https://i2.wp.com/www.radiomeuh.com/wp-content/uploads/2015/10/cropped-favicon1.png?fit=512,512',
  },
}, {
  key: '@laradionova',
  name: 'Radio Nova',
  url: 'http://novazz.ice.infomaniak.ch/novazz-128.mp3',
  cover: {
    color: '#F85453',
    logo: 'http://www.nova.fr/sites/default/files/CQCT/default.jpg',
  },
}];

const stations = (state = presets, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default stations;
