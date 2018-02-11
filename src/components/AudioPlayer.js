import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './audio-player.css';
import Cover from './Cover';
import VolumeBar from './VolumeBar';

class AudioPlayer extends React.Component {

  constructor (props) {
    super(props);
    this.audio = null;
    this.source = null;
  }

  componentDidMount () {
    if (!this.audio) return;
    this.audio.volume = this.props.volume;
  }

  componentWillReceiveProps (nextprops) {
    if (!this.audio) return;
    const { volume, station, isplaying } = this.props;
    if (nextprops.volume !== volume) {
      this.audio.volume = nextprops.volume;
    }
    if (nextprops.station && (nextprops.station !== station)) {
      this.source.src = nextprops.station.url;
      this.audio.load();
    }
    if (nextprops.isplaying !== isplaying) {
      if (nextprops.isplaying) this.audio.play();
      else this.audio.pause();
    }
  }

  render () {
    const { station, volume, isplaying } = this.props;
    return (
      <div id="audio-player">
        <audio volume={volume}
          ref={(ref) => { this.audio = ref; }}>
          <track kind="captions" />
          <source type="audio/mpeg"
            src={station.url}
            ref={(ref) => { this.source = ref; }} />
        </audio>
        <div id="audio-controls">
          <Cover disabled={!station}
            volume={volume}
            isplaying={isplaying}
            cover={((station && station.cover) ? { ...station.cover } : false)} />
          <VolumeBar volume={volume} />
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  volume: PropTypes.number.isRequired,
  isplaying: PropTypes.bool.isRequired,
  station: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]).isRequired
};

const mapStateToProps = state => ({
  station: state.station,
  isplaying: state.isplaying,
  volume: (state.volume / 100)
});

export default connect(
  mapStateToProps,
  null
)(AudioPlayer);
