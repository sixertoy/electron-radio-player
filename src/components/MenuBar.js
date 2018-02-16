import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './menubar.css';
import Search from './menu/Search';
import { toggleRemovable } from './../actions';

const MenuBar = ({
  canedit,
  dispatch,
  removable,
}) => (
  <div id="menubar">
    {!canedit && (
      <button onClick={() => dispatch(replace('/player'))}>
        <i className="icon icon-left-thin" />
      </button>
    )}
    <Search />
    {canedit && (
      <button onClick={() => dispatch(toggleRemovable())}
        className={`button removable ${removable ? 'active' : ''}`}>
        <i className="icon icon-trash" />
      </button>
    )}
  </div>
);

MenuBar.defaultProps = {
  canedit: false,
};

MenuBar.propTypes = {
  canedit: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  removable: PropTypes.bool.isRequired,
};

export default connect()(MenuBar);
