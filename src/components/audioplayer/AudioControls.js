import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './audiocontrols.css';
import VolumeBar from './VolumeBar';
import Equalizer from './Equalizer';
import { mute, unmute } from './../../actions';

const AudioControls = ({
  muted,
  source,
  volume,
  paused,
  loading,
  openURL,
  toggleMute,
}) => (
  <div id="audio-controls"
    className="flex-columns">
    <Equalizer muted={muted}
      clickHandler={() => toggleMute(!muted)}
      active={((source && source.ready) && !loading && !paused) || false} />
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
);

AudioControls.defaultProps = {
  source: null,
};

AudioControls.propTypes = {
  source: PropTypes.object,
  muted: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  openURL: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openURL: value => window.NodeContext.openExternalURL(value),
  toggleMute: (muted) => {
    if (muted) dispatch(mute());
    else dispatch(unmute());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(AudioControls);