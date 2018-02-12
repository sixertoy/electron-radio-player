const electron = require('electron');
const { isdarwin } = require('./utils');
const devtools = require('./menu/devtools');

const defaultFile = require('./menu/default/file');
const defaultView = require('./menu/default/view');
const defaulthelp = require('./menu/default/help');

const macabout = require('./menu/mac/about');
const macedit = require('./menu/mac/edit');
const macview = require('./menu/mac/view');
const macwindow = require('./menu/mac/window');

const { Menu } = electron;
const defaultTemplate = [
  defaultFile,
  defaultView,
  defaulthelp,
];

const darwinTemplate = [
  macabout,
  macedit,
  macview,
  macwindow,
  defaulthelp,
];

const buildMenu = (mainWindow) => {
  devtools(mainWindow);
  const template = isdarwin()
    ? darwinTemplate : defaultTemplate;
  const menu = Menu.buildFromTemplate(template.map(fn => fn(mainWindow)));
  Menu.setApplicationMenu(menu);
  return menu;
};

module.exports = buildMenu;
