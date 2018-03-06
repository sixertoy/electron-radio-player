import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import './alerttoaster.css';
import { noop } from './../lib/noop';
import { removeToast } from './../actions';

const Toast = ({
  message, onClose, id, type,
}) => (
  <div className={`toast toast-${type}`}>
    <button onClick={() => onClose(id)}>
      <i className="icon icon-cancel" />
    </button>
    <span>{message}</span>
  </div>
);

Toast.defaultProps = {
  id: -1,
  onClose: noop,
  type: 'static',
};

Toast.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  onClose: PropTypes.func,
  message: PropTypes.string.isRequired,
};

class AlertToaster extends React.PureComponent {
  constructor (props) {
    super(props);
    const { items, dispatch } = this.props;
    this.state = { stacked: [].concat(items) };
    this.onClose = this.onClose.bind(this);
    this.onCloseAll = this.onCloseAll.bind(this);
    this.actions = bindActionCreators({ removeToast }, dispatch);
  }

  componentWillReceiveProps ({ items }) {
    if (items.length === this.state.stacked.length) return;
    const { stacked } = this.state;
    const filtered = items.filter(toast => !stacked.includes(toast));
    this.setState(prev => ({
      stacked: prev.stacked.concat(filtered),
    }));
  }

  onClose (id) {
    this.setState(
      ({ stacked }) => ({
        stacked: stacked.filter(obj => obj.id !== id),
      }),
      () => this.actions.removeToast(id),
    );
  }

  onCloseAll () {
    const { stacked } = this.state;
    stacked.map(({ id }) => this.actions.removeToast(id));
    this.setState({ stacked: [] });
  }

  render () {
    const { stacked } = this.state;
    const maxlen = 5; // use container height instead
    const len = stacked.length;
    return (
      <div id="toasts-container">
        <div className="holder">
          {stacked &&
            stacked
              .slice(0, maxlen)
              .map(obj => <Toast key={`toast::${obj.id}`} onClose={this.onClose} {...obj} />)}
          {len <= maxlen ? null : (
            <Toast key="toast::static"
              message={`...${len - maxlen} more`}
              onClose={this.onCloseAll} />
          )}
        </div>
      </div>
    );
  }
}

AlertToaster.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AlertToaster);
