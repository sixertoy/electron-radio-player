import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './audioplayer.css';
import TrackCover from './audioplayer/TrackCover';
import AudioWrapper from './audioplayer/AudioWrapper';
import AudioControls from './audioplayer/AudioControls';

const AudioPlayer = ({
  muted,
  volume,
  paused,
  source,
  loading,
}) => (
  <div id="audio-player">
    {source && (
      <AudioWrapper url={source.url}
        muted={muted}
        paused={paused}
        volume={volume} />)}
    <TrackCover paused={paused}
      muted={muted}
      loading={loading}
      cover={(source && source.cover)} />
    <AudioControls muted={muted}
      source={source}
      volume={volume}
      paused={paused}
      loading={loading} />
  </div>
);

AudioPlayer.defaultProps = {
  source: null,
};

AudioPlayer.propTypes = {
  source: PropTypes.object,
  muted: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  muted: state.muted,
  paused: state.paused,
  source: state.source,
  loading: state.loading,
  volume: (state.volume / 100),
});

export default connect(mapStateToProps)(AudioPlayer);
