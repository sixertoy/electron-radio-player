const electron = require('electron');

const { ipcRenderer } = electron;

/**
 * Get current Webpage parameters
 * Defined by 'main.js' during loading application process
 *
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 *
 */
// eslint-disable-next-line
function getUrlParameter (key) {
  // eslint-disable-next-line
  const name = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Do Not Expose All The Things
window.NodeContext = {
  openExternalURL: url =>
    electron.shell.openExternal(url),
  onApplicationError: message =>
    ipcRenderer.send('errorInWindow', message),
  getLocale: (inuppercase) => {
    const locale = electron.app.getLocale();
    return (inuppercase ? locale.toLocaleUpperCase() : locale);
  },
};
