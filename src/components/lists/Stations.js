import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './stations.css';
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
    this.stationClick = this.stationClick.bind(this);
    this.state = { selected: false, items: [].concat(props.stations) };
  }

  componentWillReceiveProps ({ stations }) {
    this.setState({ items: [].concat(stations) });
  }

  stationClick (index, item) {
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

  removeItem (index) {
    this.setState(({ items }) => ({
      items: items.filter((itm, idx) => (index !== idx)),
    }));
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
        clickHandler={() => this.stationClick(index, item)} />
    );
  }

  render () {
    const { items } = this.state;
    return (
      <ListLayout id="stations">
        {items && items.map((item, index) => (
          <RemovableItem key={`${item.key}-1`}
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
  // removable: PropTypes.bool.isRequired,
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
  loaderror: (state.loaderror && (typeof state.loaderror === 'string')),
});

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch(pause()),
  resume: () => dispatch(resume()),
  play: item => dispatch(play(item)),
  remove: index => dispatch(removeStation(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations);
