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

  renderStation (item, parent) {
    const { loading, paused, loaderror } = this.props;
    const isselected = (item.key === this.state.selected.key);
    let status = (isselected && !paused && !loaderror) ? 'pause' : 'play';
    if (isselected && loading) status = 'spin6 animated-spin';
    const key = `${parent ? `${parent.key}::` : ''}${item.key}`;
    return (
      <button key={key}
        className="item button"
        onClick={() => this.onStationClick(item)}>
        <i className={`icon icon-${status}`} />
        <span className="name">{item.name}</span>
      </button>
    );
  }

  render () {
    const { stations } = this.props;
    return (
      <div id="stations">
        <Scrollbars className="scrollbox-list">
          {stations && stations.map(item => this.renderStation(item, null))}
        </Scrollbars>
      </div>
    );
  }
}

Stations.propTypes = {
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  stations: PropTypes.array.isRequired,
  loaderror: PropTypes.bool.isRequired,
  // actions
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  loading: state.loading,
  stations: state.stations,
  loaderror: (state.loaderror && (typeof state.loaderror === 'string')),
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
