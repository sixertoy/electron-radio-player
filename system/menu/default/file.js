const submenu = mainwindow => ({
  label: '&File',
  submenu: [{
    label: '&Open',
    accelerator: 'Ctrl+O'
  }, {
    label: '&Close',
    accelerator: 'Ctrl+W',
    click: () => mainwindow.close()
  }]
});

module.exports = submenu;
