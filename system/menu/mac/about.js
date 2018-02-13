const electron = require('electron');

const { app } = electron;
const submenu = () => ({
  label: app.getName(),
  submenu: [{
    label: `About ${app.getName()}`,
    selector: 'orderFrontStandardAboutPanel:',
  },
  { type: 'separator' },
  { label: 'Services', submenu: [] },
  { type: 'separator' },
  {
    label: `Hide ${app.getName()}`,
    accelerator: 'Command+H',
    selector: 'hide:',
  }, {
    label: 'Hide Others',
    accelerator: 'Command+Shift+H',
    selector: 'hideOtherApplications:',
  }, {
    label: 'Show All',
    selector: 'unhideAllApplications:',
  },
  { type: 'separator' },
  {
    label: 'Quit',
    accelerator: 'Command+Q',
    click: () => { app.quit(); },
  }],
});

module.exports = submenu;
