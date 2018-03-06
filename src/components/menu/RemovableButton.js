import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { noop } from './../../lib/noop';
import { toggleRemovable } from './../../actions';

const RemovebleButton = ({ editable, dispatch, disabled }) => (
  <button disabled={disabled}
    onClick={disabled ? noop : () => dispatch(toggleRemovable())}
    className={`button removable ${editable ? 'active' : ''}`}>
    <i className="icon icon-list" />
  </button>
);

RemovebleButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  editable: state.removable,
  disabled: state.playlist.length <= 0,
});

export default connect(mapStateToProps)(RemovebleButton);
