import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './audioplayer.css';
import Cover from './audioplayer/Cover';
import { mute, unmute } from './../actions';
// import VolumeBar from './audioplayer/VolumeBar';
import Equalizer from './audioplayer/Equalizer';
import AudioWrapper from './audioplayer/AudioWrapper';

const AudioPlayer = ({
  muted,
  volume,
  paused,
  source,
  loading,
  dispatch,
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
        active={Boolean(source && !loading)}
        clickHandler={() => dispatch(!muted ? mute() : unmute())} />
      {/* <VolumeBar volume={volume}
        muted={muted}
        loading={loading}
        active={source && !paused} /> */}
      {/* <button className="button twitter"
        disabled={(!source || source.key.indexOf('@') < 0)}
        onClick={() =>
          window.NodeContext.openExternalURL(`https://twitter.com/${source && source.key}`)}>
        <i className="icon icon-twitter" />
      </button> */}
      {/* <button className="button website"
        disabled={(!source || !source.website)}
        onClick={() =>
          window.NodeContext.openExternalURL((source && source.website))}>
        <i className="icon icon-info-circled" />
      </button> */}
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
  volume: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  muted: state.muted,
  paused: state.paused,
  source: state.source,
  loading: state.loading,
  volume: (state.volume / 100),
});

export default connect(mapStateToProps)(AudioPlayer);
