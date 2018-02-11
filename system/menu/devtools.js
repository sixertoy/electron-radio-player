const electron = require('electron');
const { isdevelopment, usedebug } = require('./../utils');

const { Menu } = electron;
module.exports = (mainwindow) => {
  if (!isdevelopment() && !usedebug()) return;
  mainwindow.openDevTools();
  mainwindow.webContents.on('context-menu', (e, props) => {
    const { x, y } = props;
    Menu.buildFromTemplate([{
      label: 'Inspect element',
      click: () => mainwindow.inspectElement(x, y)
    }]).popup(mainwindow);
  });
};
