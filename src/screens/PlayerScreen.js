import React from 'react';

// application
import Stations from './../components/Stations';
import AudioPlayer from './../components/AudioPlayer';

const SearchScreen = () => (
  <div id="application-screen">
    <AudioPlayer />
    <Stations />
  </div>
);

export default SearchScreen;
