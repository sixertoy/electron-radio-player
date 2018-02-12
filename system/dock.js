const electron = require('electron');
const { getasset } = require('./utils');

const { app, Menu } = electron;
module.exports = (mainwindow) => {
  app.dock.setIcon(getasset('app-icon.png'));
  app.dock.setMenu(Menu.buildFromTemplate([]));
  return mainwindow;
};
