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
const webpage = (isdevelopment() ? process.env.ELECTRON_START_URL
  : url.format({
    slashes: true,
    protocol: 'file:',
    pathname: path.join(__dirname, '..', 'build', 'index.html'),
  }));


let win = null;
let shouldquit = false;
function buildpplication () {
  logger('Application is Ready');
  win = new BrowserWindow({
    title: app.getName(),
    icon: getasset('app-icon.png'),
    width: 285,
    height: 600,
    minWidth: 285,
    maxHeight: 600,
    minHeight: 600,
    //
    vibrancy: null, // 'dark',
    transparent: false,
    background: '#282C34',
    //
    show: false,
    fullscreenable: true,
    resizable: isdevelopment(),
    titleBarStyle: 'hidden',
    webPreferences: { preload: webcontext },
  });

  win.on('close', (evt) => {
    if (!isdarwin() || shouldquit) return;
    evt.preventDefault();
    win.hide();
  });

  win.on('swipe', () => {});

  win.on(
    'ready-to-show',
    () => {
      logger('BrowserWindow ready to show');
      win.show();
    },
  );

  win.loadURL(`${webpage}`);
  return win;
}

/* ------------------------------------------------------

 APP EVENTS
 https://electronjs.org/docs/api/app#%C3%89v%C3%A9nements

------------------------------------------------------ */
app.on('before-quit', () => { shouldquit = true; });
app.on('activate', () => (!win ? null : win.show()));
app.on('window-all-closed', () => (!isdarwin() ? app.quit() : noop));
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  win = null;
});
app.on('ready', fp.compose(
  /* FILO */
  ipc,
  shortcuts,
  // tray,
  // menubar,
  dock,
  buildpplication,
));
