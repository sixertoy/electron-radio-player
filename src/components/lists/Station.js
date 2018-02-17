import React from 'react';
import PropTypes from 'prop-types';

const Station = ({
  item,
  active,
  loading,
  clickHandler,
}) => (
  <button className={`item button ${active ? 'active' : ''}`}
    onClick={clickHandler}>
    {!active && !loading && <i className="icon icon-play" />}
    {active && !loading && <i className="icon icon-pause" />}
    {loading && <i className="icon icon-spin6 animate-spin" />}
    <span className="name">{item.name}</span>
  </button>
);

Station.propTypes = {
  item: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Station;
