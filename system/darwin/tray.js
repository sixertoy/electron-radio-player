const electron = require('electron');
const { getasset } = require('./utils');

const { app, Menu, Tray } = electron;
module.exports = () => {
  const icon = getasset('tray-icon.png');
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { type: 'separator' },
    { label: 'Quitter', type: 'normal', role: 'quit' },
  ]);
  tray.setToolTip(`${app.getName()} v${app.getVersion()}`);
  tray.setContextMenu(contextMenu);
};
