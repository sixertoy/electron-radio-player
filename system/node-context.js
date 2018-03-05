const Conf = require('conf');
const electron = require('electron');

const { ipcRenderer, remote } = electron;

let electronstore = null;

/**
 * From https://github.com/sindresorhus/electron-store
 */
class ElectronStore extends Conf {
  constructor (opts = {}) {
    // /Users/<user_name>/Library/Application Support/<application_name>
    const configName = 'database';
    const cwd = remote.app.getPath('userData');
    const options = Object.assign({}, { cwd, configName }, opts);
    super(options);
  }
  openInEditor () {
    electron.shell.openItem(this.path);
  }
}

/**
 * Get current Webpage parameters
 * Defined by 'main.js' during loading application process
 *
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 *
 */
// eslint-disable-next-line
function getUrlParameter(key) {
  // eslint-disable-next-line
  const name = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

ipcRenderer.on('openPlaylist', () => {
  if (!electronstore) return electronstore;
  return electronstore.openInEditor();
});

// Do Not Expose All The Things
window.NodeContext = {
  createStore: (opts) => {
    if (electronstore) return electronstore;
    electronstore = new ElectronStore(opts);
    return electronstore;
  },
  openExternalURL: url => electron.shell.openExternal(url),
  onApplicationError: message => ipcRenderer.send('errorInWindow', message),
  getLocale: (inuppercase) => {
    const locale = remote.app.getLocale();
    return inuppercase ? locale.toLocaleUpperCase() : locale;
  },
};
