/* eslint
  global-require: 0 */
const electron = require('electron');
const { getasset } = require('./utils');
const { isdevelopment } = require('./utils');

const { BrowserWindow } = electron;
let mainwindow = null;

const buildWindow = (...funcs) => {
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
    titleBarStyle: isdevelopment() ? 'default' : 'hiddenInset'
  });

  // Emitted when the window is closed.
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainwindow.on('closed', () => { mainwindow = null; });
  mainwindow.once('ready-to-show', () => mainwindow.show());
  funcs.forEach(func => func(mainwindow));
  return mainwindow;
};

module.exports = buildWindow;
