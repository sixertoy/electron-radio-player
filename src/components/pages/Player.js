import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// application
import MenuBar from './../MenuBar';
import Podcasts from './../Podcasts';
import Playlist from './../Playlist';
import StationForm from './../StationForm';
import AudioPlayer from './../AudioPlayer';
import SearchResults from './../SearchResults';

const PlayerWindow = ({ location }) => {
  // const { pathname } = location;
  // const timeout = { enter: 2000, exit: 2000 };
  // const currentKey = (pathname && pathname.split('/')[1]) || 'player';
  return (
    <div id="page-player"
      className="app-page flex-rows">
      <AudioPlayer />
      <div className="page-screens-container">
        <div id="playlist-screen" className="page-screen">
          <Playlist />
        </div>
        <section>
          <Switch location={location}>
            <Route path="/player/create"
              component={StationForm} />
            <Route path="/player/podcasts"
              component={Podcasts} />
            <Route path="/player/searchresults"
              component={SearchResults} />
          </Switch>
        </section>
        <MenuBar />
      </div>
    </div>
  );
};

PlayerWindow.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PlayerWindow;
