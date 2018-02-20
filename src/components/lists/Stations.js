import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import Station from './Station';
import ListLayout from './../../hoc/ListLayout';
import RemovableItem from './../../hoc/RemovableItem';
import {
  play,
  pause,
  resume,
  removeStation,
} from './../../actions';

class Stations extends React.PureComponent {

  constructor (props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.radioClick = this.radioClick.bind(this);
    this.podcastClick = this.podcastClick.bind(this);
    this.state = { selected: false, items: [].concat(props.stations) };
  }

  componentWillReceiveProps ({ stations }) {
    if (stations.length !== this.state.items.length) {
      // update state from props
      // only if add/remove stations from another component
      this.setState({ items: [].concat(stations) });
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
    const { openCollection, loading } = this.props;
    if (loading) return;
    openCollection(item);
  }

  removeItem (index) {
    const item = this.state.items[index];
    const { remove } = this.props;
    this.setState(({ items }) => ({
      items: items.filter((itm, idx) => (index !== idx)),
    }), () => remove(item));
  }

  renderItem (item, index) {
    const { loading, loaderror } = this.props;
    const isactive = (index === this.state.selected);
    const isloading = (isactive && loading);
    return (
      <Station key={item.key}
        item={item}
        loading={isloading}
        active={isactive && !loaderror}
        clickHandler={() => {
          switch (item.type) {
          case 'radio':
            return this.radioClick(index, item);
          default:
            return this.podcastClick(index, item);
          }
        }} />
    );
  }

  render () {
    const { items } = this.state;
    return (
      <ListLayout id="stations">
        {items && items.map((item, index) => (
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
  loaderror: PropTypes.bool.isRequired,
  stations: PropTypes.array.isRequired,
  // actions
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  openCollection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  loading: state.loading,
  stations: state.stations,
  loaderror: (state.loaderror && (typeof state.loaderror === 'string')),
});

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch(pause()),
  resume: () => dispatch(resume()),
  play: item => dispatch(play(item)),
  remove: index => dispatch(removeStation(index)),
  openCollection: () => {
    dispatch(replace('/player/podcasts'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations);
