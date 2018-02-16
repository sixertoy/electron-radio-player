import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './cover.css';
import Vinyl from './../../assets/vinyl-cover';
import { resume, unmute, pause } from './../../actions';

const coverColors = {
  logo: false,
  color: '#282C34',
  background: 'transparent',
};

const Cover = ({
  muted,
  cover,
  paused,
  loading,
  dispatch,
}) => {
  let status = (paused ? 'pause' : 'play');
  if (loading) status = 'spin6 animate-spin';
  const custom = Object.assign({}, coverColors, (!cover ? {} : { ...cover }));
  return (
    <div id="audio-player-cover"
      style={{ backgroundColor: custom.background }}>
      <div className="cover-container">
        <Vinyl className="cover-background"
          color={custom.color}
          background={custom.background} />
        <div className="cover-image"
          style={!custom.logo ? {} : { backgroundImage: `url(${custom.logo})` }} />
      </div>
      {!muted && cover && (
        <button className="button cover-button"
          disabled={loading}
          onClick={() => dispatch(paused ? resume() : pause())}>
          <i className={`icon icon-${status}`} />
        </button>
      )}
      {muted && (
        <button className="button cover-button"
          onClick={() => dispatch(unmute())}>
          <i className="icon icon-mute" />
        </button>
      )}
    </div>
  );
};

Cover.defaultProps = {
  cover: null,
};

Cover.propTypes = {
  cover: PropTypes.object,
  muted: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Cover);
