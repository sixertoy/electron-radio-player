import React from 'react';

// application
import MenuBar from './../MenuBar';
import StationForm from './../StationForm';
import Podcasts from './../lists/Podcasts';
import Playlist from './../lists/Playlist';
import AudioPlayer from './../AudioPlayer';
import SearchResults from './../lists/SearchResults';

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
