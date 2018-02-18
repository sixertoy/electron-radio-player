import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

const BackButton = ({ dispatch }) => (
  <button onClick={() => dispatch(replace('/player'))}>
    <i className="icon icon-left-thin" />
  </button>
);

BackButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(BackButton);
