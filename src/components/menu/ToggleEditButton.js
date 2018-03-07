import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { noop } from './../../lib/noop';
import { toggleEditable } from './../../actions';

const ToggleEditButton = ({ editable, dispatch, disabled }) => (
  <button disabled={disabled}
    onClick={disabled ? noop : () => dispatch(toggleEditable())}
    className={`button toggleedit-button ${editable ? 'active' : ''}`}>
    <i className="icon icon-list" />
  </button>
);

ToggleEditButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  editable: state.editable,
  disabled: state.playlist.length <= 0,
});

export default connect(mapStateToProps)(ToggleEditButton);
