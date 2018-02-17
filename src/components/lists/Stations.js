import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// application
// import './stations.css';
import Station from './Station';
import {
  play,
  pause,
  resume,
} from './../../actions';

class Stations extends React.PureComponent {

  constructor (props) {
    super(props);
    this.stationClick = this.stationClick.bind(this);
    this.state = { selected: false, items: props.stations };
  }

  componentWillReceiveProps (nextprops) {
    this.setState({ items: nextprops.stations });
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

  render () {
    const { items } = this.state;
    const { loading } = this.props;
    return (
      <Scrollbars id="stations"
        className="scrollbox-list">
        {items && items.map((item, index) => {
          const isactive = (index === this.state.selected);
          const isloading = (isactive && loading);
          return (
            <Station key={item.key}
              item={item}
              index={index}
              active={isactive}
              loading={isloading}
              clickHandler={() => this.stationClick(index, item)} />
          );
        })}
      </Scrollbars>
    );
  }
}

Stations.propTypes = {
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
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
  // removable: state.removable,
  // loaderror: (state.loaderror && (typeof state.loaderror === 'string')),
});

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch(pause()),
  resume: () => dispatch(resume()),
  play: item => dispatch(play(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations);
