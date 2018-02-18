import React from 'react';

// application
import MenuBar from './../MenuBar';
import CreateForm from './../CreateForm';
import AudioPlayer from './../AudioPlayer';
import Stations from './../lists/Stations';
import SearchResults from './../lists/SearchResults';
import PodcastsCollection from './../lists/PodcastsCollection';

const MainWindow = () => (
  <div id="page-player"
    className="app-page flex-rows">
    <AudioPlayer />
    <div className="page-screens-container">
      <div id="playlist-screen" className="page-screen">
        <Stations />
      </div>
      <div id="podcasts-screen" className="page-screen">
        <PodcastsCollection />
      </div>
      <MenuBar />
      <div id="searchresults-screen" className="page-screen">
        <SearchResults />
      </div>
      <div id="create-screen" className="page-screen">
        <CreateForm />
      </div>
    </div>
  </div>
);

export default MainWindow;
