import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

const ScrollboxHeader = ({
  dispatch,
}) => (
  <div className="scrollbox-header">
    <button onClick={() => dispatch(goBack())}>
      <i className="item icon-left-thin" />
    </button>
  </div>
);

ScrollboxHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ScrollboxHeader);
