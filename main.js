/* eslint
  no-console: 0,
  global-require: 0 */
const url = require('url');
const path = require('path');
const electron = require('electron');
const builddock = require('./system/dock');
const {
  fp,
  noop,
  logger,
  getasset,
  isdarwin,
  isdevelopment,
} = require('./system/utils');

// application
const {
  app,
  BrowserWindow,
} = electron;

const webpage = process.env.ELECTRON_START_URL || url.format({
  slashes: true,
  protocol: 'file:',
  pathname: path.join(__dirname, '..', 'build', 'index.html'),
});

let mainwindow = null;
let shouldquit = false;
function buildpplication () {
  logger('Application is Ready');
  mainwindow = new BrowserWindow({
    title: 'Radio Player',
    icon: getasset('app-icon.png'),
    width: 285,
    height: 600,
    minWidth: 285,
    maxHeight: 600,
    minHeight: 600,
    //
    // vibrancy: 'dark',
    // transparent: true,
    //
    show: false,
    fullscreenable: true,
    resizable: isdevelopment(),
    titleBarStyle: 'hiddenInset',
  });

  mainwindow.on('close', (evt) => {
    if (shouldquit) return;
    evt.preventDefault();
    mainwindow.hide();
  });

  mainwindow.on(
    'ready-to-show',
    () => { mainwindow.show(); },
  );

  mainwindow.loadURL(webpage);
  return mainwindow;
}

/* ------------------------------------------------------

 APP EVENTS

------------------------------------------------------ */
app.on(
  'before-quit',
  () => { shouldquit = true; },
);

app.on(
  'will-quit',
  () => { mainwindow = null; },
);

app.on(
  'window-all-closed',
  () => (!isdarwin() ? app.quit() : noop),
);

app.on(
  'activate',
  () => (!mainwindow ? null : mainwindow.show()),
);

app.on('ready', fp.compose(
  // buildmenu,
  builddock,
  buildpplication,
));
