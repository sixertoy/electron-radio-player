import React from 'react';

// application
import MenuBar from './../MenuBar';
import Podcasts from './../Podcasts';
import Playlist from './../Playlist';
import StationForm from './../StationForm';
import AudioPlayer from './../AudioPlayer';
import SearchResults from './../SearchResults';

const MainWindow = () => (
  <div id="page-player"
    className="app-page flex-rows">
    <AudioPlayer />
    <div className="page-screens-container">
      <div id="playlist-screen" className="page-screen">
        <Playlist />
      </div>
      <div id="podcasts-screen" className="page-screen">
        <Podcasts />
      </div>
      <MenuBar />
      <div id="searchresults-screen" className="page-screen">
        <SearchResults />
      </div>
      <div id="create-screen" className="page-screen">
        <StationForm />
      </div>
    </div>
  </div>
);

export default MainWindow;
