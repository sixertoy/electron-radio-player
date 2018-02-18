// Communication between WebApp -> Electron
const electron = require('electron');
const { isdevelopment } = require('./utils');

const { ipcMain, app } = electron;
module.exports = (win) => {
  ipcMain.on('muted', () => {});
  ipcMain.on('playpause', () => {});
  ipcMain.on('errorInWindow', () => {
    if (!isdevelopment()) return;
    // [MS Windows] setOverlayIcon
    // Only MacOS/Linux
    app.dock.setBadge('!');
  });
  return win;
};
