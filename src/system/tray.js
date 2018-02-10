const path = require('path');
const electron = require('electron');

const { app, Menu, Tray } = electron;

class TrayBuilder {

  constructor (mainWindow) {
    this.tray = null;
    this.mainWindow = mainWindow;
  }

  buildTray () {
    const iconfile = path.join(__dirname, '..', 'assets', 'mac', 'tray-icon.png');
    this.tray = new Tray(iconfile);
    const contextMenu = Menu.buildFromTemplate([
      { label: __dirname, type: 'normal' },
      { label: app.getAppPath(), type: 'normal' },
      { label: 'Quitter', type: 'normal', role: 'quit' }
    ]);
    this.tray.setToolTip('Ceci est mon application.');
    this.tray.setContextMenu(contextMenu);
  }

}

module.exports = TrayBuilder;
