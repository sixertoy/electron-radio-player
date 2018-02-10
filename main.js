/* eslint
  global-require: 0 */
const url = require('url');
const path = require('path');
const electron = require('electron');

// application
const TrayBuilder = require('./src/system/tray');
const MenuBuilder = require('./src/system/menu');

let mainWindow = false;
const { app, BrowserWindow } = electron;

function onApplicationReadyHandler () {

  const appicon = path.join(__dirname, 'src', 'assets', 'app-icons', 'app-icon.png');
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    width: 285,
    show: false,
    height: 600,
    icon: appicon,
    minWidth: 285,
    maxHeight: 600,
    minHeight: 600,
    title: 'Radio Player',
    fullscreenable: true,
    backgroundColor: '#282C34',
    // electronjs.org/docs/api/frameless-window
    titleBarStyle: (process.env.NODE_ENV === 'development') ? 'default'
      : 'hiddenInset',
    resizable: (process.env.NODE_ENV === 'development')
  });

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    slashes: true,
    protocol: 'file:',
    pathname: path.join(__dirname, '/build/index.html')
  });
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  const trayBuilder = new TrayBuilder(mainWindow);
  trayBuilder.buildTray();

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) onApplicationReadyHandler();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onApplicationReadyHandler);
