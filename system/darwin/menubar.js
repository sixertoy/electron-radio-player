const electron = require('electron');
const { fp } = require('./../utils');

// application
const view = require('./menu/view');
const help = require('./menu/help');
const about = require('./menu/about');
const edit = require('./../menu/edit');
const fenetre = require('./menu/fenetre');

const { Menu } = electron;
module.exports = (win) => {
  const template = fp.each([win], about, edit, view, fenetre, help);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  return win;
};
