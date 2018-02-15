import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// application
import './index.css';
import { configure } from './store';

import MenuBar from './components/MenuBar';
import Stations from './components/Stations';
import Networker from './components/Networker';
import AudioPlayer from './components/AudioPlayer';

// application
const store = configure();
const Root = () => (
  <Provider store={store}>
    <div id="application-screen">
      <div id="application-header" />
      <AudioPlayer />
      <Stations />
      <MenuBar />
      <Networker />
    </div>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
