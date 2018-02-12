const electron = require('electron');
// const devtools = require('./menu/devtools');
const { fp, isdarwin } = require('./utils');

const macview = require('./menu/mac/view');
const macedit = require('./menu/mac/edit');
const macabout = require('./menu/mac/about');
const macwindow = require('./menu/mac/window');

const defaultFile = require('./menu/default/file');
const defaultView = require('./menu/default/view');
const defaulthelp = require('./menu/default/help');

const { Menu } = electron;
const defaultos = fp.compose(
  defaultFile,
  defaultView,
  defaulthelp,
);

const darwinos = fp.compose(
  macabout,
  macedit,
  macview,
  macwindow,
  defaulthelp,
);

const buildMenu = (mainWindow) => {
  // devtools(mainWindow);
  const template = isdarwin() ? darwinos : defaultos;
  const menu = Menu.buildFromTemplate(template(mainWindow));
  Menu.setApplicationMenu(menu);
  return mainWindow;
};

module.exports = buildMenu;
