function getUrlParameter (key) {
  // eslint-disable-next-line
  const name = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Do Not Expose All The Things
window.NodeContext = {};
