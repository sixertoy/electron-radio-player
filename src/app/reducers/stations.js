const presets = [{
  key: 'fip',
  name: 'FIP',
  url: 'http://direct.fipradio.fr/live/fip-midfi.mp3',
  cover: {
    color: '#E2007A',
    logo: 'http://bit.ly/2CbLlZM'
  }
}, {
  key: 'fip-electro',
  name: 'FIP Electro',
  url: 'http://direct.fipradio.fr/live/fip-webradio8.mp3'
}, {
  key: 'fip-rock',
  name: 'FIP Rock',
  url: 'http://direct.fipradio.fr/live/fip-webradio1.mp3'
}, {
  key: 'fip-jazz',
  name: 'FIP Jazz',
  url: 'http://direct.fipradio.fr/live/fip-webradio2.mp3'
}, {
  key: 'fip-groove',
  name: 'FIP Groove',
  url: 'http://direct.fipradio.fr/live/fip-webradio3.mp3'
}, {
  key: 'fip-world',
  name: 'FIP World',
  url: 'http://direct.fipradio.fr/live/fip-webradio4.mp3'
}, {
  key: 'fip-nouveaute',
  name: 'FIP Nouveauté',
  url: 'http://direct.fipradio.fr/live/fip-webradio5.mp3'
}, {
  key: 'fip-reggae',
  name: 'FIP Reggae',
  url: 'http://direct.fipradio.fr/live/fip-webradio6.mp3'
}, {
  key: 'radio-meuh',
  name: 'Radio Meuh',
  url: 'https://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3',
  cover: {
    color: '#FFFFFF',
    logo: 'http://bit.ly/2CaWbzh'
  }
}];

const stations = (state = presets, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default stations;
