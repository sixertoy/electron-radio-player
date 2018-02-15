import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { offlineStatus } from './../actions';
import './networker.css';

class Networker extends React.Component {

  constructor (props) {
    super(props);
    this.state = { isonline: false };
  }

  componentWillReceiveProps () {
    const status = navigator.onLine;
    if (status === this.state.isonline) return;
    const { statusChanged } = this.props;
    this.setState({ isonline: status }, () => statusChanged(status));
  }

  render () {
    const { isonline } = this.state;
    return (
      <div id="networker"
        className={`${isonline ? '' : 'offline'}`} />
    );
  }
}

Networker.propTypes = {
  statusChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapStateToDispatch = dispatch => ({
  statusChanged: online => dispatch(offlineStatus(!online)),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(Networker);
