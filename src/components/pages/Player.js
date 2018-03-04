import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// application
import Form from './../Form';
import MenuBar from './../MenuBar';
// import Podcasts from './../Podcasts';
import Playlist from './../Playlist';
import AudioPlayer from './../AudioPlayer';
// import SearchResults from './../SearchResults';

// const { pathname } = location;
// const timeout = { enter: 2000, exit: 2000 };
// const currentKey = (pathname && pathname.split('/')[1]) || 'player';
const PlayerWindow = ({ location }) => (
  <div id="page-player"
    className="app-page flex-rows">
    <AudioPlayer />
    <div className="page-screens-container">
      <Playlist />
      <section>
        <Switch location={location}>
          <Route path="/player/create"
            component={Form} />
          {/*
          <Route path="/player/podcasts"
            component={Podcasts} />
          <Route path="/player/searchresults"
            component={SearchResults} />
          */}
        </Switch>
      </section>
      <MenuBar />
    </div>
  </div>
);

PlayerWindow.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PlayerWindow;
