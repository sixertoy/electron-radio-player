import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './cover.css';
import { play, pause } from './../actions';
import Vinyl from './../../assets/vinyl-cover';

const coverColors = {
  logo: false,
  color: '#282C34',
  background: '#181A1F'
};

const Cover = ({
  cover,
  volume,
  disabled,
  isplaying,
  dispatch
}) => {
  const status = (!isplaying ? 'play' : 'pause');
  const custom = Object.assign({}, coverColors, (!cover ? {} : { ...cover }));
  return (
    <div id="cover" className={`${disabled ? 'disabled' : ''}`}>
      <Vinyl color={custom.color} background={custom.background} />
      <span className="volume">
        <i className="icon icon-volume" />
        <span className="value">{Math.round(volume * 100)}</span>
      </span>
      <div className="cover-image"
        style={!custom.logo ? {} : { backgroundImage: `url(${custom.logo})` }} />
      <button className="button"
        disabled={disabled}
        onClick={() => dispatch(isplaying ? pause() : play())}>
        <i className={`icon icon-${disabled ? 'stop' : status}`} />
      </button>
    </div>
  );
};

Cover.defaultProps = {
  cover: false
};

Cover.propTypes = {
  volume: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isplaying: PropTypes.bool.isRequired,
  cover: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};

export default connect()(Cover);
