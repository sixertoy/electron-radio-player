/* eslint
  global-require: 0 */
const url = require('url');
const path = require('path');
const electron = require('electron');
const { noop, isdarwin } = require('./system/utils');


// application
const { app, BrowserWindow } = electron;
const buildMenu = require('./system/menu');
const buildTray = require('./system/tray');
const buildDock = require('./system/dock');
const { isdevelopment, getasset } = require('./system/utils');

let mainwindow = null;
function onApplicationReadyHandler () {
  mainwindow = new BrowserWindow({
    // https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    width: 285,
    show: false,
    height: 600,
    minWidth: 285,
    maxHeight: 600,
    minHeight: 600,
    fullscreenable: true,
    title: 'Radio Player',
    resizable: isdevelopment(),
    backgroundColor: '#282C34',
    icon: getasset('app-icon.png'),
    // electronjs.org/docs/api/frameless-window
    titleBarStyle: isdevelopment() ? 'default' : 'hiddenInset',
  });

  // Load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL
    || url.format({
      slashes: true,
      protocol: 'file:',
      pathname: path.join(__dirname, '/build/index.html'),
    });
  mainwindow.loadURL(startUrl);

  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainwindow.on('closed', () => { mainwindow = null; });
  mainwindow.once('ready-to-show', () => mainwindow.show());

  [
    buildMenu,
    buildTray,
    buildDock,
  ].forEach(func => func(mainwindow));
}

// Quit when all windows are closed.
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', isdarwin() ? noop
  : app.quit());

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', (mainwindow === null) ? noop
  : onApplicationReadyHandler);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onApplicationReadyHandler);
