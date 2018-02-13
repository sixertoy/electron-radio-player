const electron = require('electron');

const { app } = electron;
module.exports = () => ({
  label: app.getName(),
  submenu: [
    { label: `About ${app.getName()}`, role: 'about' },
    { label: `Version ${app.getVersion()}`, enabled: false },
    { type: 'separator' },
    { label: 'Preferences', accelerator: 'Command+,', click: () => {} },
    { type: 'separator' },
    { label: `Hide ${app.getName()}`, accelerator: 'Command+H', role: 'hide' },
    { label: 'Hide Others', accelerator: 'Command+Shift+H', rol: 'hideOthers' },
    { label: 'Show All', role: 'unhide' },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() },
  ],
});
