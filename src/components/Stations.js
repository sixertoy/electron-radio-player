import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// application
import { play, pause, changeStation } from './../actions';
import './stations.css';

const Stations = ({
  station,
  stations,
  dispatch,
  isloading,
  isplaying,
}) => (
  <div id="stations">
    <Scrollbars className="stations-scrollbox">
      {stations && stations.map((item) => {
        const isactive = (item.key === station.key);
        const isactivepaused = (!isplaying && isactive);
        let status = (isactive && !isactivepaused) ? 'pause' : 'play';
        if (isloading && isactive) status = 'spin6 animate-spin';
        //
        return (
          <div key={item.key} className="station">
            <button className="button station-name"
              onClick={() => {
                if (isactive && isplaying) dispatch(pause());
                else if (isactive && !isplaying) dispatch(play());
                else dispatch(changeStation(item));
              }}>
              <i className={`icon icon-${status}`} />
              <span className="name">{item.name}</span>
            </button>
          </div>
        );
      })}
    </Scrollbars>
  </div>
);

Stations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isloading: PropTypes.bool.isRequired,
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
  isloading: state.isloading,
  isplaying: state.isplaying,
});

export default connect(mapStateToProps)(Stations);
