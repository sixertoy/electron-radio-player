import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './cover.css';
import Vinyl from './../../assets/vinyl-cover';
import { resume, pause } from './../../actions';

const coverColors = {
  logo: false,
  color: '#282C34',
  background: '#181A1F',
};

const Cover = ({
  cover,
  paused,
  loading,
  dispatch,
}) => {
  let status = (paused ? 'play' : 'pause');
  if (loading) status = 'spin6 animated-spin';
  const custom = Object.assign({}, coverColors, (!cover ? {} : { ...cover }));
  return (
    <div id="audio-player-cover">
      <div className="cover-container">
        <Vinyl className="cover-background"
          color={custom.color}
          background={custom.background} />
        <div className="cover-image"
          style={!custom.logo ? {} : { backgroundImage: `url(${custom.logo})` }} />
      </div>
      <button className="button cover-button"
        disabled={loading}
        onClick={() => dispatch(paused ? resume() : pause())}>
        <i className={`icon icon-${status}`} />
      </button>
    </div>
  );
};

Cover.defaultProps = {
  cover: null,
};

Cover.propTypes = {
  cover: PropTypes.object,
  paused: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Cover);
