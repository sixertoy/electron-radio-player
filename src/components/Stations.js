import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// application
import './stations.css';
import { play, pause, resume } from './../actions';

class Stations extends React.Component {

  constructor (props) {
    super(props);
    this.state = { selected: false };
    this.onStationClick = this.onStationClick.bind(this);
  }

  onStationClick (item) {
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

  renderStation (item) {
    const { loading, paused } = this.props;
    const isselected = (item.key === this.state.selected.key);
    let status = (isselected && !paused) ? 'pause' : 'play';
    if (isselected && loading) status = 'spin6 animated-spin';
    return (
      <div key={item.key}
        className="station">
        <button className="button station-name"
          onClick={() => this.onStationClick(item)}>
          <i className={`icon icon-${status}`} />
          <span className="name">{item.name}</span>
        </button>
      </div>
    );
  }

  render () {
    const { stations } = this.props;
    return (
      <div id="stations">
        <Scrollbars className="stations-scrollbox">
          {stations && stations.map(item => this.renderStation(item))}
        </Scrollbars>
      </div>
    );
  }
}

Stations.propTypes = {
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  stations: PropTypes.array.isRequired,
  // actions
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  loading: state.loading,
  stations: state.stations,
});

const mapDispatchToProps = dispatch => ({
  play: item => dispatch(play(item)),
  pause: () => dispatch(pause()),
  resume: () => dispatch(resume()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations);
