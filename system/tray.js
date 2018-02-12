const electron = require('electron');
const { getasset } = require('./utils');

const { app, Menu, Tray } = electron;
module.exports = () => {
  const icon = getasset('tray-icon.png');
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([{
    label: app.getAppPath(),
    type: 'normal',
  }, {
    label: 'Quitter',
    type: 'normal',
    role: 'quit',
  }]);
  tray.setToolTip('Radio Player');
  tray.setContextMenu(contextMenu);
};
