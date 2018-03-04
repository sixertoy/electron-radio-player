import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import { buffering, buffered, bufferError } from './../../actions';

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
    this.actions = bindActionCreators(
      { buffering, buffered, bufferError },
      props.dispatch,
    );
  }

  componentDidMount () {
    // this.audioref.addEventListener('abort', debugAudioEventListener);
    // this.audioref.addEventListener('ended', debugAudioEventListener);
    // this.audioref.addEventListener('seeked', debugAudioEventListener);
    // this.audioref.addEventListener('canplay', debugAudioEventListener);
    // this.audioref.addEventListener('seeking', debugAudioEventListener);
    // this.audioref.addEventListener('suspend', debugAudioEventListener);
    // this.audioref.addEventListener('progress', debugAudioEventListener);
    // this.audioref.addEventListener('buffereddata', debugAudioEventListener);
    // this.audioref.addEventListener('ratechange', debugAudioEventListener);
    // this.audioref.addEventListener('timeupdate', debugAudioEventListener);
    // this.audioref.addEventListener('interruptend', debugAudioEventListener);
    // this.audioref.addEventListener('interruptbegin', debugAudioEventListener);
    // this.audioref.addEventListener('bufferedmetadata', debugAudioEventListener);
    // this.audioref.addEventListener('durationchange', debugAudioEventListener);
  }

  componentWillReceiveProps (nextprops) {
    this.audioref.muted = nextprops.muted;
    this.audioref.volume = nextprops.volume;
    // conditionnals
    if (this.props.paused !== nextprops.paused) {
      // pause/play toggler
      if (!this.audioref.paused) this.audioref.pause();
      else this.audioref.play();
    }
    if (this.props.url !== nextprops.url) {
      if (!this.audioref.paused) this.audioref.pause();
      this.sourceref.src = nextprops.url;
      this.audioref.load();
    }
  }

  shouldComponentUpdate () {
    // never update the component
    // the audio player is controlled by the html 'audio' tag events
    return false;
  }

  onAudioLoadError () {
    let error = false;
    const code = this.audioref.networkState;
    switch (code) {
    case 1:
      error = 'fetching process aborted by user';
      break;
    case 3:
      error = 'error occurred when decoding';
      break;
    case 4:
      error = 'audio/video not supported';
      break;
    case 2:
    default:
      error = 'error occurred when downloading';
    }
    this.actions.bufferError(error);
  }

  onAudioLoaded () {
    this.actions.buffered();
    this.audioref.play(); // autoplay when buffered
  }

  onAudioStartLoading () {
    const { url } = this.props;
    if (!url) return;
    this.actions.buffering();
  }

  render () {
    // only render once at mount
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
  url: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AudioWrapper);
