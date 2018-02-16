import React from 'react';

// application
import Stations from './../components/Stations';
import AudioPlayer from './../components/AudioPlayer';

const PlayerScreen = () => (
  <div id="player-screen"
    className="application-screen">
    <AudioPlayer />
    <Stations />
  </div>
);

export default PlayerScreen;
