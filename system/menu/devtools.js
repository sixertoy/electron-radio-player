const electron = require('electron');
const { isdevelopment } = require('./../utils');

const { Menu } = electron;
module.exports = (win) => {
  if (!isdevelopment()) return;
  win.webContents.on('context-menu', (e, props) => {
    const { x, y } = props;
    Menu.buildFromTemplate([{
      label: 'Inspect element',
      click: () => win.inspectElement(x, y),
    }]).popup(win);
  });
};
