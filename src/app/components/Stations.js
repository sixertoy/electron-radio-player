import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// application
import './stations-list.css';
import { play, pause, changeStation } from './../actions';

const Stations = ({
  station,
  stations,
  isplaying,
  dispatch
}) => (
  <div id="stations-list">
    <Scrollbars style={{ width: '100%' }}>
      <div className="list">
        {stations && stations.map((item) => {
          const isactive = (item.key === station.key);
          return (
            <div key={item.key}
              className={`station ${isactive ? 'active' : ''}`}>
              <button className="button"
                onClick={() => {
                  if (isplaying) dispatch(pause());
                  if (!isactive) dispatch(changeStation(item));
                  else dispatch(changeStation(false));
                  if (!isplaying) dispatch(play());
                }}>
                <i className={`icon icon-${(isactive) ? 'pause' : 'play'}`} />
                <span>{item.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </Scrollbars>
  </div>
);

Stations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isplaying: PropTypes.bool.isRequired,
  stations: PropTypes.array.isRequired,
  station: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]).isRequired
};

const mapStateToProps = state => ({
  station: state.station,
  stations: state.stations,
  isplaying: state.isplaying
});

export default connect(mapStateToProps)(Stations);
