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
import Player from './components/pages/Player';
import Preferences from './components/pages/Preferences';

/* --------------------------------------------

 MAIN APPLICATION COMPONENT

-------------------------------------------- */
const AppComponent = ({
  pageslug,
  screenslug,
}) => (
  <div id="application"
    className="flex-rows"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
    <Helmet>
      <body className={`${pageslug} ${screenslug}`} />
    </Helmet>
    <div id="application-header">
      <div className="overlay" />
    </div>
    <div id="application-container">
      <Preferences />
      <Player />
    </div>
  </div>
);

AppComponent.propTypes = {
  pageslug: PropTypes.string.isRequired,
  screenslug: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  let { pathname } = state.router.location;
  pathname = slugify(pathname || 'player');
  pathname = pathname.split('-');
  return ({
    pageslug: (pathname[0] ? `page-${pathname[0]}` : ''),
    screenslug: (pathname[1] ? `screen-${pathname[1]}` : ''),
  });
};

const App = connect(mapStateToProps)(AppComponent);

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
