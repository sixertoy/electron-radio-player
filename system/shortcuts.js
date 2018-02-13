const electron = require('electron');

const { globalShortcut } = electron;
module.exports = (win) => {
  // Ne pas utiliser les touches audio de l'OS
  // Ca permet à chaque application d'avoir son propre volume sonore
  // -> comportement d'iTunes
  // globalShortcut.register('VolumeUp', () => {});
  // globalShortcut.register('VolumeMute', () => {});
  // globalShortcut.register('VolumeDown', () => {});
  globalShortcut.register('VolumeMute', () => {});
  globalShortcut.register('MediaPlayPause', () => {});
  return win;
};
