import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './networker.css';
import { networkStatus } from './../actions';

class Networker extends React.Component {

  constructor (props) {
    super(props);
    // this will not work in VM
    // instead use ipcMain/ipcRenderer
    // https://electronjs.org/docs/tutorial/online-offline-events
    this.onOnline = this.onOnline.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.state = { isonline: navigator.onLine };
  }

  componentWillMount () {
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);
  }

  componentDidMount () {
    const { statusChanged } = this.props;
    statusChanged(this.state.isonline);
  }

  componentWillReceiveProps () {
    const online = navigator.onLine;
    if (online === this.state.isonline) return;
    if (online) this.onOnline();
    else this.onOffline();
  }

  componentWillUnmount () {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
  }

  onOnline () {
    const { statusChanged } = this.props;
    this.setState({ isonline: true }, () => statusChanged(true));
  }

  onOffline () {
    const { statusChanged } = this.props;
    this.setState({ isonline: false }, () => statusChanged(false));
  }

  render () {
    const { isonline } = this.state;
    return (
      <div id="networker"
        className={`${isonline ? '' : 'offline'}`}>
        <div>
          <span className="banner">
            Aucune connexion internet n&apos;a été détectée.
            Radio Player se reconnectera lorsqu&apos;une connexion sera disponible
          </span>
        </div>
      </div>
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
  statusChanged: isonline => dispatch(networkStatus(isonline)),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(Networker);
