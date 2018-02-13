// Communication between WebApp -> Electron
const electron = require('electron');

const { ipcMain } = electron;
module.exports = (win) => {
  ipcMain.on('muted', () => {});
  ipcMain.on('playpause', () => {});
  return win;
};
