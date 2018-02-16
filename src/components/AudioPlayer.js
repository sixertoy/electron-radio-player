import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './audioplayer.css';
import Cover from './audioplayer/Cover';
import { mute, unmute } from './../actions';
import VolumeBar from './audioplayer/VolumeBar';
import Equalizer from './audioplayer/Equalizer';
import AudioWrapper from './audioplayer/AudioWrapper';

const AudioPlayer = ({
  muted,
  volume,
  paused,
  source,
  loading,
  openURL,
  toggleMute,
}) => (
  <div id="audio-player">
    {!source ? null
      : <AudioWrapper url={source.url}
        muted={muted}
        paused={paused}
        volume={volume} />}
    <Cover paused={paused}
      loading={loading}
      cover={(source && source.cover)} />
    <div id="audio-player-controls">
      <Equalizer muted={muted}
        paused={paused}
        clickHandler={toggleMute}
        active={Boolean(source && !loading)} />
      <VolumeBar volume={volume}
        muted={muted}
        loading={loading}
        active={(source && !paused)} />
      <button className="button twitter"
        disabled={(!source || source.key.indexOf('@') < 0)}
        onClick={() => openURL(`https://twitter.com/${source && source.key}`)}>
        <i className="icon icon-twitter" />
      </button>
      <button className="button website"
        disabled={(!source || !source.website)}
        onClick={() => openURL((source && source.website))}>
        <i className="icon icon-info-circled" />
      </button>
    </div>
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
  openURL: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  toggleMute: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  muted: state.muted,
  paused: state.paused,
  source: state.source,
  loading: state.loading,
  volume: (state.volume / 100),
});

const mapDispatchToProps = (dispatch, props) => ({
  openURL: value => window.NodeContext.openExternalURL(value),
  toggleMute: () => dispatch(props.muted ? unmute() : mute()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioPlayer);
