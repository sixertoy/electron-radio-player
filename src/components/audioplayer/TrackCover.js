import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './trackcover.css';
import Vinyl from './../../assets/vinyl-cover';
import { resume, unmute, pause } from './../../actions';

const coverColors = {
  logo: false,
  color: '#282C34',
  background: 'transparent',
};

const Cover = ({
  muted, color, background, logo, paused, dispatch, buffering, disabled,
}) => {
  let status = paused ? 'pause' : 'play';
  if (buffering) status = 'spin6 animate-spin';
  const custom = Object.assign({}, coverColors, { color, background, logo });
  return (
    <div id="track-cover" style={{ backgroundColor: custom.background }}>
      <div className="cover-container">
        <Vinyl className="cover-background" color={custom.color} background={custom.background} />
        <div className="cover-image"
          style={!custom.logo ? {} : { backgroundImage: `url(${custom.logo})` }} />
      </div>
      {!muted &&
        !disabled && (
          <button className="button cover-button"
            disabled={buffering}
            onClick={() => dispatch(paused ? resume() : pause())}>
            <i className={`icon icon-${status}`} />
          </button>
        )}
      {muted &&
        !disabled && (
          <button className="button cover-button" onClick={() => dispatch(unmute())}>
            <i className="icon icon-mute" />
          </button>
        )}
    </div>
  );
};

Cover.defaultProps = {
  logo: '',
  color: '#FFFFFF',
  background: '#000000',
};

Cover.propTypes = {
  logo: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  muted: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  buffering: PropTypes.bool.isRequired,
};

export default connect()(Cover);
