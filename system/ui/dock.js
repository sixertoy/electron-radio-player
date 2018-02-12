const electron = require('electron');
const { getasset } = require('./utils');

const { app, Menu } = electron;
module.exports = () => {
  const icon = getasset('app-icon.png');
  const menu = Menu.buildFromTemplate([
    // https://electronjs.org/docs/api/menu
  ]);
  // https://electronjs.org/docs/api/app#appdockbouncetype-macos
  app.dock.setMenu(menu);
  app.dock.setIcon(icon);
};
