const electron = require('electron');

const { shell } = electron;
const submenu = () => ({
  label: 'Help',
  submenu: [{
    label: 'Learn More',
    click: () => shell.openExternal('http://electron.atom.io'),
  }, {
    label: 'Documentation',
    click: () => shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme'),
  }, {
    label: 'Community Discussions',
    click: () => shell.openExternal('https://discuss.atom.io/c/electron'),
  }, {
    label: 'Search Issues',
    click: () => shell.openExternal('https://github.com/atom/electron/issues'),
  }],
});

module.exports = submenu;
