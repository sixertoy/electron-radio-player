module.exports = () => ({
  label: 'Edit',
  submenu: [
    { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
    { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
    { type: 'separator' },
    { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
    { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
    { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
    { label: 'Select All', accelerator: 'Command+A', selector: 'selectAll:' },
  ],
});
