import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './menubar.css';
import Search from './menu/Search';
import { togglEditable } from './../actions';

const MenuBar = ({
  canedit,
  dispatch,
  editable,
}) => (
  <div id="menubar">
    {!canedit && (
      <button onClick={() => dispatch(replace('/player'))}>
        <i className="icon icon-left-thin" />
      </button>
    )}
    <Search />
    {canedit && (
      <button onClick={() => dispatch(togglEditable())}
        className={`button editable ${editable ? 'active' : ''}`}>
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
  editable: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(MenuBar);
