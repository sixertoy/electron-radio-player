const electron = require('electron');
const { fp } = require('./../utils');

// application
const view = require('./menu/view');
const edit = require('./menu/edit');
const help = require('./menu/help');
const about = require('./menu/about');
const fenetre = require('./menu/fenetre');

const { Menu } = electron;
module.exports = (win) => {
  const template = fp.each([win, 'toto'], about, edit, view, fenetre, help);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  return win;
};
