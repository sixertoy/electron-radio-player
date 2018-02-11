/* eslint
  global-require: 0 */
const url = require('url');
const path = require('path');
const electron = require('electron');
const { noop, isdarwin } = require('./src/system/utils');


// application
const { app } = electron;
const buildMenu = require('./src/system/menu');
const buildTray = require('./src/system/tray');
const buildDock = require('./src/system/dock');
const buildWindow = require('./src/system/window');

let mainwindow = null;
function onApplicationReadyHandler () {
  mainwindow = buildWindow(
    buildMenu,
    buildTray,
    buildDock
  );
  // Load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL
    || url.format({
      slashes: true,
      protocol: 'file:',
      pathname: path.join(__dirname, '/build/index.html')
    });
  mainwindow.loadURL(startUrl);
}

// Quit when all windows are closed.
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', isdarwin() ? noop
  : app.quit());

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', mainwindow ? noop
  : onApplicationReadyHandler);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onApplicationReadyHandler);
