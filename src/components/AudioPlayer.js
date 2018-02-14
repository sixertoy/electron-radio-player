import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { loading, loaded } from './../actions';
import './audioplayer.css';
import Cover from './audioplayer/Cover';
import VolumeBar from './audioplayer/VolumeBar';
import Equalizer from './audioplayer/Equalizer';

const onAudioEventListener = (evt) => {
  // eslint-disable-next-line no-console
  console.log('onAudioEvent => ', evt.type);
};

class AudioPlayer extends React.Component {

  constructor (props) {
    super(props);
    this.audio = null;
    this.source = null;
    this.onAudioLoaded = this.onAudioLoaded.bind(this);
    this.onAudioLoadError = this.onAudioLoadError.bind(this);
    this.onAudioStartLoading = this.onAudioStartLoading.bind(this);
  }

  componentDidMount () {
    if (!this.audio) return;
    this.audio.volume = this.props.volume;
    this.audio.addEventListener('error', onAudioEventListener);
    this.audio.addEventListener('abort', onAudioEventListener);
    this.audio.addEventListener('ended', onAudioEventListener);
    this.audio.addEventListener('seeked', onAudioEventListener);
    // this.audio.addEventListener('canplay', onAudioEventListener);
    this.audio.addEventListener('seeking', onAudioEventListener);
    this.audio.addEventListener('suspend', onAudioEventListener);
    this.audio.addEventListener('waiting', onAudioEventListener);
    // this.audio.addEventListener('progress', onAudioEventListener);
    this.audio.addEventListener('loadstart', onAudioEventListener);
    this.audio.addEventListener('loadeddata', onAudioEventListener);
    this.audio.addEventListener('ratechange', onAudioEventListener);
    // this.audio.addEventListener('timeupdate', onAudioEventListener);
    this.audio.addEventListener('interruptend', onAudioEventListener);
    this.audio.addEventListener('interruptbegin', onAudioEventListener);
    // this.audio.addEventListener('canplaythrough', onAudioEventListener);
    this.audio.addEventListener('loadedmetadata', onAudioEventListener);
    this.audio.addEventListener('durationchange', onAudioEventListener);
  }

  componentWillReceiveProps (nextprops) {
    if (!this.audio) return;
    const {
      volume,
      station,
      isplaying,
    } = this.props;
    if (nextprops.volume !== volume) {
      this.audio.volume = Math.max(0, nextprops.volume);
    }
    if (nextprops.isplaying !== isplaying) {
      if (!nextprops.isplaying) this.audio.pause();
      else this.audio.play();
    }
    if (nextprops.station !== station) {
      this.source.src = nextprops.station.url;
      this.audio.load();
    }
  }

  componentWillUnmount () {
    if (!this.audio) return;
    this.audio.pause();
  }

  onAudioLoadError () {
    if (!this.props.station) return;
    const code = this.audio.networkState;
    // 1 = MEDIA_ERR_ABORTED - fetching process aborted by user
    // 2 = MEDIA_ERR_NETWORK - error occurred when downloading
    // 3 = MEDIA_ERR_DECODE - error occurred when decoding
    // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED - audio/video not supported
    // eslint-disable-next-line no-console
    console.log('code', code);
  }

  onAudioStartLoading () {
    if (!this.props.station) return;
    // once loading started
    // remove the event listener
    const { dispatch } = this.props;
    dispatch(loading());
  }

  onAudioLoaded () {
    if (!this.props.station) return;
    const { dispatch } = this.props;
    dispatch(loaded());
  }

  renderAudioWrapper () {
    const { volume, station } = this.props;
    return (
      <audio volume={volume}
        ref={(ref) => { this.audio = ref; }}
        onError={this.onAudioLoadError}
        onWaiting={this.onAudioStartLoading}
        onCanPlayThrough={this.onAudioLoaded}
        onLoadStart={this.onAudioStartLoading}>
        <track kind="captions" />
        <source type="audio/mpeg"
          src={(station && station.url) || null}
          ref={(ref) => { this.source = ref; }} />
      </audio>
    );
  }

  render () {
    const {
      volume,
      station,
      isplaying,
      isloading,
    } = this.props;
    return (
      <div id="audio-player">
        {this.renderAudioWrapper()}
        <Cover isplaying={isplaying}
          disabled={!station || isloading}
          cover={((station && station.cover) ? { ...station.cover } : false)} />
        <div id="audio-player-controls">
          <Equalizer muted={false}
            playing={isplaying}
            clickHandler={() => {}} />
          <VolumeBar volume={volume}
            isactive={station !== false && isplaying} />
          <button className="button twitter"
            disabled={(!station || station.key.indexOf('@') < 0)}
            onClick={() =>
              window.NodeContext.openExternalURL(`https://twitter.com/${station.key}`)}>
            <i className="icon icon-twitter" />
          </button>
          <button className="button website"
            disabled={(!station || !station.website)}
            onClick={() =>
              window.NodeContext.openExternalURL((station && station.website))}>
            <i className="icon icon-info-circled" />
          </button>
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  volume: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  isloading: PropTypes.bool.isRequired,
  isplaying: PropTypes.bool.isRequired,
  station: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = state => ({
  station: state.station,
  isloading: state.isloading,
  isplaying: state.isplaying,
  volume: (state.volume / 100),
});

export default connect(mapStateToProps)(AudioPlayer);
