/* eslint
  no-console: 0,
  global-require: 0 */
const url = require('url');
const path = require('path');
const electron = require('electron');

// application
const ipc = require('./system/ipc');
const dock = require('./system/darwin/dock');
const shortcuts = require('./system/shortcuts');
const menubar = require('./system/darwin/menubar');
const devtools = require('./system/menu/devtools');
const {
  fp,
  noop,
  logger,
  getasset,
  isdarwin,
  isdevelopment,
} = require('./system/utils');

const { app, BrowserWindow, globalShortcut } = electron;

// URL du script preload
// donnant acces a l'application au contexte NodeJS
const webcontext = path.join(__dirname, 'system', 'node-context.js');

// URL de la page Web de l'application
const apppage = (isdevelopment() ? process.env.ELECTRON_START_URL
  : url.format({
    slashes: true,
    protocol: 'file:',
    pathname: path.join(__dirname, 'build', 'index.html'),
  }));

let mainwin = null;
let shouldquit = false;
function buildpplication () {
  logger('Application is Ready');
  mainwin = new BrowserWindow({
    title: app.getName(),
    icon: getasset('app-icon.png'),
    width: 285,
    height: 600,
    minWidth: 285,
    maxHeight: 600,
    minHeight: 600,
    //
    // -------- OSX/Light Theme --------
    // frame: true,
    // titleBarStyle: 'default',
    // -------- Dark Theme --------
    frame: false,
    titleBarStyle: 'hidden',
    //
    vibrancy: 'dark', // 'dark'
    backgroundColor: '#00282C34',
    //
    show: false,
    resizable: true, // isdevelopment(),
    maximizable: false,
    transparent: false,
    fullscreenable: false,
    webPreferences: { preload: webcontext },
  });

  mainwin.on('close', (evt) => {
    if (!isdarwin() || shouldquit) return;
    evt.preventDefault();
    mainwin.hide();
  });

  mainwin.on('swipe', () => {});

  mainwin.on('ready-to-show', () => {
    logger('BrowserWindow ready to show');
    mainwin.show();
    mainwin.focus();
  });

  // load 'player' screen at startup
  mainwin.loadURL(`${apppage}#player`);
  return mainwin;
}

/* ------------------------------------------------------

 APP EVENTS
 https://electronjs.org/docs/api/app#%C3%89v%C3%A9nements

------------------------------------------------------ */
// quand l'user use CTR+Q
app.on('before-quit', () => { shouldquit = true; });
// quand l'user click sur l'icone dans le dock
app.on('activate', () => (!mainwin ? null : mainwin.show() && mainwin.focus()));
// quand l'utilisateur click sur l'icone de fermeture de fenetre
app.on('window-all-closed', () => (!isdarwin() ? app.quit() : noop));
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  mainwin = null;
});
app.on('ready', fp.compose(
  /* FILO */
  ipc,
  shortcuts,
  devtools,
  // tray,
  menubar,
  dock,
  buildpplication,
));
