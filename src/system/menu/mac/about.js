const electron = require('electron');

const { app } = electron;
const submenu = () => ({
  label: 'Radio Player',
  submenu: [{
    label: 'About Radio Player',
    selector: 'orderFrontStandardAboutPanel:'
  },
  { type: 'separator' },
  {
    label: 'Services',
    submenu: []
  },
  { type: 'separator' },
  {
    label: 'Hide Radio Player',
    accelerator: 'Command+H',
    selector: 'hide:'
  }, {
    label: 'Hide Others',
    accelerator: 'Command+Shift+H',
    selector: 'hideOtherApplications:'
  }, {
    label: 'Show All',
    selector: 'unhideAllApplications:'
  },
  { type: 'separator' },
  {
    label: 'Quit',
    accelerator: 'Command+Q',
    click: () => { app.quit(); }
  }]
});

module.exports = submenu;
