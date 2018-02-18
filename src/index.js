import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

// application
import './index.css';
import { configure } from './store';
import { slugify } from './fp/slugify';
import MenuBar from './components/MenuBar';
import Networker from './components/Networker';
import CreateScreen from './screens/CreateScreen';
import SearchScreen from './screens/SearchScreen';
import AudioPlayer from './components/AudioPlayer';
import StationScreen from './screens/StationScreen';
import PodcastScreen from './screens/PodcastScreen';

/* --------------------------------------------

 MAIN APPLICATION COMPONENT

-------------------------------------------- */
const AppComponent = ({
  path,
}) => (
  <div id="application" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
    <Helmet>
      <body className={path} />
    </Helmet>
    <div id="application-header">
      <div className="overlay" />
    </div>
    <AudioPlayer />
    <div id="screens-container">
      <StationScreen />
      <PodcastScreen />
      <MenuBar />
      <SearchScreen />
      <CreateScreen />
    </div>
    <Networker />
  </div>
);

AppComponent.propTypes = {
  path: PropTypes.string.isRequired,
};

const App = connect(state => ({
  path: slugify(state.router.location.pathname || 'player'),
}))(AppComponent);

/* --------------------------------------------

 REACT DOM RENDER

-------------------------------------------- */
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
