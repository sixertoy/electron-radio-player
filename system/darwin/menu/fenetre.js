module.exports = () => ({
  label: 'Window',
  submenu: [
    { label: 'Minimize', accelerator: 'Command+M', selector: 'performMiniaturize:' },
    { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
  ],
});
