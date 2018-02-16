import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './menubar.css';
import Search from './menu/Search';

const MenuBar = ({
  canedit,
  dispatch,
}) => (
  <div id="menubar">
    {!canedit && (
      <button onClick={() => dispatch(replace('/player'))}>
        <i className="icon icon-left-thin" />
      </button>
    )}
    <Search />
    {canedit && (
      <button onClick={() => {}}>
        <i className="icon icon-pencil" />
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
};

export default connect()(MenuBar);
