const electron = require('electron');

const { shell } = electron;
module.exports = (mainwindow) => {
  mainwindow.webContents.on('will-navigate', (evt, url) => {
    evt.preventDefault();
    shell.openExternal(url);
  });
};
