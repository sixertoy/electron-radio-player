import React from 'react';
import PropTypes from 'prop-types';

// application
import './equalizer.css';

const Equalizer = ({
  muted,
  active,
  paused,
  clickHandler,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className={`equalizer ${(active && !paused) ? '' : 'inactive'} ${!muted ? '' : 'muted'}`}
    tabIndex="0"
    role="button"
    onClick={clickHandler}>
    <span className="equalizer-bars">
      <span className="equalizer-bar" />
    </span>
  </div>
);

Equalizer.propTypes = {
  muted: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  clickHandler: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
};

export default Equalizer;
