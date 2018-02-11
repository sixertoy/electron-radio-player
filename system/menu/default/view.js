const { isdevelopment } = require('./../../utils');

const submenudev = mainwindow => [{
  accelerator: 'Ctrl+R',
  label: '&Reload',
  click: () => mainwindow.webContents.reload()
}, {
  accelerator: 'F11',
  label: 'Toggle &Full Screen',
  click: () => mainwindow.setFullScreen(!mainwindow.isFullScreen())
}, {
  accelerator: 'Alt+Ctrl+I',
  label: 'Toggle &Developer Tools',
  click: () => mainwindow.toggleDevTools()
}];

const submenuprod = mainwindow => [{
  accelerator: 'F11',
  label: 'Toggle &Full Screen',
  click: () => mainwindow.setFullScreen(!mainwindow.isFullScreen())
}];

module.exports = mainwindow => ({
  label: '&View',
  submenu: isdevelopment()
    ? submenudev(mainwindow) : submenuprod(mainwindow)
});
