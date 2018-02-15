import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { loading, loaded, loadError } from './../../actions';

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
    // this.audioref.addEventListener('abort', debugAudioEventListener);
    // this.audioref.addEventListener('ended', debugAudioEventListener);
    // this.audioref.addEventListener('seeked', debugAudioEventListener);
    // this.audioref.addEventListener('canplay', debugAudioEventListener);
    // this.audioref.addEventListener('seeking', debugAudioEventListener);
    // this.audioref.addEventListener('suspend', debugAudioEventListener);
    // this.audioref.addEventListener('progress', debugAudioEventListener);
    // this.audioref.addEventListener('loadeddata', debugAudioEventListener);
    // this.audioref.addEventListener('ratechange', debugAudioEventListener);
    // this.audioref.addEventListener('timeupdate', debugAudioEventListener);
    // this.audioref.addEventListener('interruptend', debugAudioEventListener);
    // this.audioref.addEventListener('interruptbegin', debugAudioEventListener);
    // this.audioref.addEventListener('loadedmetadata', debugAudioEventListener);
    // this.audioref.addEventListener('durationchange', debugAudioEventListener);
  }

  componentWillReceiveProps (nextprops) {
    this.audioref.muted = this.props.muted;
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
    // the audio player is controller with tag reference
    return false;
  }

  onAudioLoadError () {
    const { dispatch } = this.props;
    let error = false;
    const code = this.audioref.networkState;
    switch (code) {
    case 1:
      error = 'fetching process aborted by user';
      break;
    case 3: error = 'error occurred when decoding';
      break;
    case 4:
      error = 'audio/video not supported';
      break;
    case 2:
    default:
      error = 'error occurred when downloading';
    }
    dispatch(loadError(error));
  }

  onAudioLoaded () {
    const { dispatch } = this.props;
    this.audioref.play(); // autoplay when loaded
    dispatch(loaded());
  }

  onAudioStartLoading () {
    const { url, dispatch } = this.props;
    if (!url) return;
    dispatch(loading());
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
