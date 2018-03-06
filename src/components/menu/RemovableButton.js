import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { toggleRemovable } from './../../actions';

const RemovebleButton = ({ removable, dispatch }) => (
  <button onClick={() => dispatch(toggleRemovable())}
    className={`button removable ${removable ? 'active' : ''}`}>
    <i className="icon icon-trash" />
  </button>
);

RemovebleButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  removable: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  removable: state.removable,
});

export default connect(mapStateToProps)(RemovebleButton);
