import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { commitStation } from './../../actions';

const CommitButton = ({ dispatch, newstation }) => (
  <button disabled={!newstation}
    onClick={() => dispatch(commitStation(newstation))}>
    <i className="icon icon-floppy" />
  </button>
);

CommitButton.defaultProps = {
  newstation: null,
};

CommitButton.propTypes = {
  newstation: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  newstation: state.newstation,
});

export default connect(mapStateToProps)(CommitButton);
