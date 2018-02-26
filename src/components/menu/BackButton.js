import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

class BackButton extends React.PureComponent {

  constructor (props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = { history: ['/player', props.pathname] };
  }

  componentWillReceiveProps (nextprops) {
    const { history } = this.state;
    const next = nextprops.pathname;
    if (next === history[history.length - 1]) return;
    this.setState(() =>
      ({ history: history.concat([next]) }));
  }

  clickHandler () {
    const { dispatch } = this.props;
    this.setState((prevstate) => {
      const { history } = prevstate;
      return ({ history: history.slice(0, history.length - 1) });
    }, () => {
      const { history } = this.state;
      dispatch(replace(history[history.length - 1]));
    });
  }

  render () {
    return (
      <button onClick={this.clickHandler}>
        <i className="icon icon-left-thin" />
      </button>
    );
  }
}

BackButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(BackButton);
