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
  dispatch,
  isplaying,
}) => (
  <div id="stations-list">
    <Scrollbars style={{ width: '100%' }}>
      <div className="list">
        {stations && stations.map((item) => {
          const isactive = (item.key === station.key);
          const isactivepaused = (!isplaying && isactive);
          const status = (isactive && !isactivepaused) ? 'pause' : 'play';
          //
          return (
            <div key={item.key}
              className={`station ${isactive ? 'active' : ''}`}>
              <button className="button"
                onClick={() => {
                  if (isactive && isplaying) dispatch(pause());
                  else if (isactive && !isplaying) dispatch(play());
                  else dispatch(changeStation(item));
                }}>
                <i className={`icon icon-${status}`} />
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
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = state => ({
  station: state.station,
  stations: state.stations,
  isplaying: state.isplaying,
});

export default connect(mapStateToProps)(Stations);
