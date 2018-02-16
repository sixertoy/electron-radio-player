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
import PlayerScreen from './screens/PlayerScreen';
import SearchScreen from './screens/SearchScreen';

/* --------------------------------------------

 MAIN APPLICATION COMPONENT

-------------------------------------------- */
const AppComponent = ({
  path,
  removable,
}) => (
  <div id="application">
    <Helmet>
      <body className={path} />
    </Helmet>
    <div id="application-header" />
    <PlayerScreen />
    <MenuBar canedit={path === 'player'}
      removable={removable} />
    <SearchScreen />
    <Networker />
  </div>
);

AppComponent.propTypes = {
  path: PropTypes.string.isRequired,
  removable: PropTypes.bool.isRequired,
};

const App = connect(state => ({
  removable: state.removable,
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
