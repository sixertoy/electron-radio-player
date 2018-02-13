module.exports = win => ({
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'Command+R',
    click: () => win.webContents.reload(),
  }, {
    label: 'Toggle Developer Tools',
    accelerator: 'Alt+Command+I',
    click: () => win.toggleDevTools(),
  }],
});
