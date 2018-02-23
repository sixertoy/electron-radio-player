import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect, Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, replace } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';

// application
import './index.css';
import { configure } from './store';
import { slugify } from './lib/slugify';
import Player from './components/pages/Player';
import Preferences from './components/pages/Preferences';

/* --------------------------------------------

 MAIN APPLICATION COMPONENT

-------------------------------------------- */
class AppComponent extends React.PureComponent {

  componentDidMount () {
    const { dispatch, pageslug, screenslug } = this.props;
    if (pageslug !== 'page-player' || screenslug !== '') {
      // fix back to main page on load/reload
      dispatch(replace('/player'));
    }
  }

  render () {
    const { pageslug, screenslug } = this.props;
    return (
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
          {pageslug === 'page-player' ? <Player /> : null}
          {pageslug === 'page-preferences' ? <Preferences /> : null}
        </div>
      </div>
    );
  }
}

AppComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
const { store, persistor } = configure(history);
const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history} >
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
