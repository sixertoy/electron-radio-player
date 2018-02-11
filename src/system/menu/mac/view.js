const { isdevelopment } = require('./../../utils');

const submenudev = mainWindow => [{
  label: 'Reload',
  accelerator: 'Command+R',
  click: () => mainWindow.webContents.reload()
}, {
  label: 'Toggle Full Screen',
  accelerator: 'Ctrl+Command+F',
  click: () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  }
}, {
  label: 'Toggle Developer Tools',
  accelerator: 'Alt+Command+I',
  click: () => mainWindow.toggleDevTools()
}];

const submenuprod = mainWindow => [{
  label: 'Toggle Full Screen',
  accelerator: 'Ctrl+Command+F',
  click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen())
}];

module.exports = mainwindow => ({
  label: 'View',
  submenu: isdevelopment()
    ? submenudev(mainwindow) : submenuprod(mainwindow)
});
