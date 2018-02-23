import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import ListLayout from './hoc/ListLayout';
import RemovableItem from './hoc/RemovableItem';
import {
  play,
  pause,
  resume,
  removeStation,
} from './../actions';

class Stations extends React.PureComponent {

  constructor (props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.radioClick = this.radioClick.bind(this);
    this.podcastClick = this.podcastClick.bind(this);
    this.state = {
      selected: false,
      stations: [].concat(props.stations),
    };
  }

  componentWillReceiveProps ({ stations }) {
    if (stations.length !== this.state.stations.length) {
      // update state from props
      // only if add/remove radios from another component
      this.setState({ stations: [].concat(stations) });
    }
  }

  radioClick (index, item) {
    const { selected } = this.state;
    const { paused, loading } = this.props;
    if (loading) return;
    this.setState({ selected: index }, () => {
      const isplayed = (selected === index);
      if (!isplayed) this.props.play(item);
      else if (paused) this.props.resume(item);
      else this.props.pause();
    });
  }

  podcastClick (index, item) {
    const { openPodcaster, loading } = this.props;
    if (loading) return;
    openPodcaster(item);
  }

  removeItem (index) {
    const item = this.state.stations[index];
    const { remove } = this.props;
    this.setState(({ stations }) => ({
      stations: stations.filter((itm, idx) => (index !== idx)),
    }), () => remove(item, this.state.stations.length));
  }

  renderItem (item, index) {
    const { loading, loaderror } = this.props;
    const isactive = (index === this.state.selected) && !loaderror;
    const isloading = (isactive && loading);
    const clickHandler = (item.type === 'radio')
      ? () => this.radioClick(index, item)
      : () => this.podcastClick(index, item);
    return (
      <button key={item.key}
        className={`list-item button ${isactive ? 'active' : ''}`}
        onClick={clickHandler}>
        {!isactive && !isloading && <i className="icon icon-play" />}
        {isactive && !isloading && <i className="icon icon-pause" />}
        {isloading && <i className="icon icon-spin6 animate-spin" />}
        <span className="name">
          <span>{item.name}</span>
        </span>
        <i className={`icon type-icon icon-${item.type}`} />
      </button>
    );
  }

  render () {
    const { stations } = this.state;
    return (
      <ListLayout id="playlist">
        {stations && stations.map((item, index) => (
          <RemovableItem key={item.key}
            removeHandler={() => this.removeItem(index)}
            itemRenderer={() => this.renderItem(item, index)} />
        ))}
      </ListLayout>
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
  remove: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  openPodcaster: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  loading: state.loading,
  stations: state.stations,
  removable: state.removable,
  loaderror: (state.loaderror && (typeof state.loaderror === 'string')),
});

const mapDispatchToProps = dispatch => ({
  pause: () =>
    dispatch(pause()),
  resume: () =>
    dispatch(resume()),
  play: item =>
    dispatch(play(item)),
  remove: (index, count) =>
    dispatch(removeStation(index, count)),
  openPodcaster: () => {
    dispatch(replace('/player/podcasts'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations);
