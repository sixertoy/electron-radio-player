const electron = require('electron');
const { getasset } = require('./../utils');

const { app, Menu } = electron;
module.exports = (win) => {
  app.dock.setMenu(Menu.buildFromTemplate([]));
  app.dock.setIcon(getasset('app-icon.png'));
  return win;
};
