import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
const debugAudioEventListener = (evt) => {
  // Debugging des events du composant audio
  // Decommenter dans componentDidMount
  console.log('onAudioEvent => ', evt.type);
};
/* eslint-enable */

class AudioWrapper extends React.Component {

  constructor (props) {
    super(props);
    this.audioref = null;
    this.sourceref = null;
    this.onAudioLoaded = this.onAudioLoaded.bind(this);
    this.onAudioLoadError = this.onAudioLoadError.bind(this);
    this.onAudioStartLoading = this.onAudioStartLoading.bind(this);
  }

  componentDidMount () {
    if (!this.audio) return;
    this.audio.volume = this.props.volume;
    // this.audio.addEventListener('error', debugAudioEventListener);
    // this.audio.addEventListener('abort', debugAudioEventListener);
    // this.audio.addEventListener('ended', debugAudioEventListener);
    // this.audio.addEventListener('seeked', debugAudioEventListener);
    // this.audio.addEventListener('canplay', debugAudioEventListener);
    // this.audio.addEventListener('seeking', debugAudioEventListener);
    // this.audio.addEventListener('suspend', debugAudioEventListener);
    // this.audio.addEventListener('waiting', debugAudioEventListener);
    // this.audio.addEventListener('progress', debugAudioEventListener);
    // this.audio.addEventListener('loadstart', debugAudioEventListener);
    // this.audio.addEventListener('loadeddata', debugAudioEventListener);
    // this.audio.addEventListener('ratechange', debugAudioEventListener);
    // this.audio.addEventListener('timeupdate', debugAudioEventListener);
    // this.audio.addEventListener('interruptend', debugAudioEventListener);
    // this.audio.addEventListener('interruptbegin', debugAudioEventListener);
    // this.audio.addEventListener('canplaythrough', debugAudioEventListener);
    // this.audio.addEventListener('loadedmetadata', debugAudioEventListener);
    // this.audio.addEventListener('durationchange', debugAudioEventListener);
  }

  onAudioLoaded () {}
  onAudioLoadError () {}
  onAudioStartLoading () {}

  render () {
    const { volume, url } = this.props;
    return (
      <audio volume={volume}
        ref={(ref) => { this.audioref = ref; }}
        onError={this.onAudioLoadError}
        onWaiting={this.onAudioStartLoading}
        onCanPlayThrough={this.onAudioLoaded}
        onLoadStart={this.onAudioStartLoading}>
        <track kind="captions" />
        <source type="audio/mpeg"
          src={url || null}
          ref={(ref) => { this.sourceref = ref; }} />
      </audio>
    );
  }
}

AudioWrapper.propTypes = {
  volume: PropTypes.number.isRequired,
  url: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
};

export default AudioWrapper;
