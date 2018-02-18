const electron = require('electron');
const { isdevelopment, logger } = require('./../utils');

const { Menu } = electron;
module.exports = (win) => {
  if (!isdevelopment()) return win;
  logger('Devtools context menu is activated');
  win.webContents.on('context-menu', (e, props) => {
    const { x, y } = props;
    Menu.buildFromTemplate([{
      label: 'Inspect element',
      click: () => win.inspectElement(x, y),
    }]).popup(win);
  });
  return win;
};
