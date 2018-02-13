import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { offlineStatus } from './../actions';
import './networker.css';

class Networker extends React.Component {

  constructor (props) {
    super(props);
    this.state = { isoffline: false };
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentWillMount () {
    window.addEventListener('online', this.onStatusChange);
    window.addEventListener('offline', this.onStatusChange);
  }

  onStatusChange (evt) {
    const { dispatch } = this.props;
    const isoffline = (evt.type === 'offline' && evt.returnValue);
    this.setState({ isoffline }, () =>
      dispatch(offlineStatus(isoffline)));
  }

  componentWillUnount () {
    window.removeEventListener('online', this.onStatusChange);
    window.removeEventListener('offline', this.onStatusChange);
  }

  render () {
    const { isoffline } = this.state;
    return (
      <div id="networker"
        className={`${isoffline ? 'isoffline' : ''}`} />
    );
  }
}

Networker.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Networker);
