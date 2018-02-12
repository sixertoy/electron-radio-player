const url = require('url');
const path = require('path');
const electron = require('electron');

// application
const { isdarwin } = require('./utils');

// https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
const WINDOW_CONFIG = {
  title: 'Radio Player',
  width: 285,
  show: false,
  height: 600,
  minWidth: 285,
  maxHeight: 600,
  minHeight: 600,
  fullscreenable: true,
  // resizable: isdevelopment(),
  backgroundColor: '#282C34',
  // icon: getasset('app-icon.png'),
  // electronjs.org/docs/api/frameless-window
  titleBarStyle: 'hiddenInset',
};

const { BrowserWindow, globalShortcut } = electron;

class MainWindow {

  constructor () {
    this.win = null;
    // EVENTS
    // https://electronjs.org/docs/api/browser-window#instance-events
    this.onBlur = this.onBlur.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClosed = this.onClosed.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onReadyToShow = this.onReadyToShow.bind(this);
    // SHORTCUTS
    this.onVolumeUp = this.onVolumeUp.bind(this);
    this.onVolumeDown = this.onVolumeDown.bind(this);
    this.onVolumeMute = this.onVolumeMute.bind(this);
    this.onMediaPlayPause = this.onMediaPlayPause.bind(this);
  }

  /* ----------------------------------------

   SHORTCUTS

  ---------------------------------------- */

  onVolumeUp () {}
  onVolumeDown () {}
  onVolumeMute () {}
  onMediaPlayPause () {}

  /* ----------------------------------------

   EVENTS

  ---------------------------------------- */

  onBlur () {
    // only macos
    // https://electronjs.org/docs/api/browser-window#winsetvibrancytype-macos
    this.win.setVibrancy('medium-light');
  }

  onFocus () {
    // only macos
    // this.win.setVibrancy('');
  }

  onSwipe () {
    // only macos
  }

  onResize () {}

  onClosed () {
    this.win = null;
  }

  onReadyToShow () {
    console.log('ready to show ready to show ready to show ready to show');
    this.win.show();
    this.win.focus();
  }

  /* ----------------------------------------

   INITIALIZE

  ---------------------------------------- */

  create () {
    this.win = new BrowserWindow(WINDOW_CONFIG);
    console.log('process.env.ELECTRON_START_URL', process.env.ELECTRON_START_URL);
    // load React index.html
    const startUrl = process.env.ELECTRON_START_URL
      || url.format({
        slashes: true,
        protocol: 'file:',
        pathname: path.join(__dirname, './../build/index.html'),
      });
    this.win.loadURL(startUrl);

    /* -------- EVENTS */
    this.win.on('blur', this.onBlur);
    this.win.on('focus', this.onFocus);
    this.win.on('closed', this.onClosed);
    this.win.on('resize', this.onResize);
    this.win.once('ready-to-show', this.onReadyToShow);
    if (isdarwin()) {
      this.win.on('swipe', this.onSwipe);
    }

    /* --------- SHORTCUTS */
    // globalShortcut.register('VolumeUp', this.onVolumeUp);
    // globalShortcut.register('VolumeDown', this.onVolumeDown);
    // globalShortcut.register('onVolumeMute', this.onVolumeMute);
    // globalShortcut.register('MediaPlayPause', this.onMediaPlayPause);
    return this.win;
  }

}

module.exports = MainWindow;
