/* eslint
  global-require: 0 */
const url = require('url');
const path = require('path');
const electron = require('electron');

// application
const MenuBuilder = require('./src/system/menu');

let mainWindow = false;
const { app, BrowserWindow } = electron;

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    // https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    title: 'My Application',
    // icon: '',
    width: 285,
    height: 600,
    fullscreenable: false,
    resizable: (process.env.NODE_ENV === 'development')
  });

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    slashes: true,
    protocol: 'file:',
    pathname: path.join(__dirname, '/build/index.html')
  });
  mainWindow.loadURL(startUrl);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
