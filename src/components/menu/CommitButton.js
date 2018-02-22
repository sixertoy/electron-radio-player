import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import { formCommit } from './../../actions';

const CommitButton = ({ dispatch, form, disabled }) => (
  <button disabled={disabled}
    onClick={() => {
      dispatch(formCommit(form));
      dispatch(replace('/player'));
    }}>
    <i className="icon icon-floppy" />
  </button>
);

CommitButton.defaultProps = {
  form: null,
  disabled: true,
};

CommitButton.propTypes = {
  form: PropTypes.object,
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ form }) => {
  // required fields
  const disabled = !(form
    && (form.url && (form.url.trim() !== ''))
    && (form.name && (form.name.trim() !== '')));
  return ({ form, disabled });
};

export default connect(mapStateToProps)(CommitButton);
