/* eslint
  no-console: 0,
  global-require: 0 */
// const url = require('url');
// const path = require('path');
const electron = require('electron');
const { noop, isdarwin } = require('./system/utils');


// application
const { app } = electron;
const MainWindow = require('./system/MainWindow');
const buildMenu = require('./system/menu');
const buildTray = require('./system/tray');
const buildDock = require('./system/dock');
// const { isdevelopment, getasset } = require('./system/utils');

let win = null;
function onApplicationReadyHandler () {
  console.log('Electron application is ready');
  const mainWindow = new MainWindow();
  win = mainWindow.create();
  [
    buildMenu,
    buildTray,
    buildDock,
  ].forEach(func => func(win));
}

// Quit when all windows are closed.
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', isdarwin() ? noop
  : app.quit());

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', (win === null) ? noop
  : onApplicationReadyHandler);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onApplicationReadyHandler);
