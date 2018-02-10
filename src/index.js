import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// application
import './index.css';
import { configure } from './app/store';

import Stations from './app/components/Stations';
import AudioPlayer from './app/components/AudioPlayer';

// application
const store = configure();
const Root = () => (
  <Provider store={store}>
    <div id="radio-player">
      <div id="radio-player-draggable" />
      <AudioPlayer />
      <Stations />
    </div>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
