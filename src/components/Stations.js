import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// application
import './stations.css';
import {
  play,
  pause,
  resume,
  removeStation,
} from './../actions';

class Stations extends React.Component {

  constructor (props) {
    super(props);
    this.state = { selected: false };
    this.stationClick = this.stationClick.bind(this);
  }

  stationClick (item) {
    const { selected } = this.state;
    const { paused, loading } = this.props;
    if (loading) return;
    this.setState({ selected: item }, () => {
      const isplayed = ((selected && selected.key) === item.key);
      if (!isplayed) this.props.play(item);
      else if (paused) this.props.resume(item);
      else this.props.pause();
    });
  }

  renderStation (item, parent) {
    const {
      paused,
      loading,
      editable,
      loaderror,
      removeStation,
    } = this.props;
    const isselected = (item.key === this.state.selected.key);
    let status = (isselected && !paused && !loaderror) ? 'pause' : 'play';
    if (isselected && loading) status = 'spin6 animate-spin';
    const key = `${parent ? `${parent.key}::` : ''}${item.key}`;
    return (
      <button key={key}
        className={`item button ${isselected ? 'active' : ''}`}
        onClick={() => {
          if (!editable) this.stationClick(item);
          else removeStation(item);
        }}>
        <i className={`icon icon-left icon-${status}`} />
        <span className="name">{item.name}</span>
        <i className="icon icon-right icon-minus-circled" />
      </button>
    );
  }

  render () {
    const { stations, editable } = this.props;
    return (
      <Scrollbars id="stations"
        className={`scrollbox-list ${editable ? 'editable' : ''}`}>
        {stations && stations.map(item => this.renderStation(item, null))}
      </Scrollbars>
    );
  }
}

Stations.propTypes = {
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  stations: PropTypes.array.isRequired,
  loaderror: PropTypes.bool.isRequired,
  // actions
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  removeStation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  loading: state.loading,
  stations: state.stations,
  editable: state.editable,
  loaderror: (state.loaderror && (typeof state.loaderror === 'string')),
});

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch(pause()),
  resume: () => dispatch(resume()),
  play: item => dispatch(play(item)),
  removeStation: item => dispatch(removeStation(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations);
