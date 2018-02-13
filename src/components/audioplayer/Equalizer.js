import React from 'react';
import PropTypes from 'prop-types';

// application
import './equalizer.css';

const Equalizer = ({ clickHandler, playing, muted }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className={`equalizer ${playing ? '' : 'inactive'} ${!muted ? '' : 'muted'}`}
    tabIndex="0"
    role="button"
    onClick={!clickHandler ? () => {} : clickHandler}>
    <span className="equalizer-bars">
      <span className="equalizer-bar" />
    </span>
  </div>
);

Equalizer.defaultProps = {
  muted: false,
  playing: false,
  clickHandler: false,
};

Equalizer.propTypes = {
  muted: PropTypes.bool,
  playing: PropTypes.bool,
  clickHandler: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
};

export default Equalizer;
