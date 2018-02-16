import React from 'react';

// application
import './menubar.css';
import Search from './menu/Search';

const MenuBar = () => (
  <div id="menubar">
    <Search />
    <button onClick={() => {}}>
      <i className="icon icon-pencil" />
    </button>
  </div>
);

export default MenuBar;
