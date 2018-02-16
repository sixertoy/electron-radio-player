import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Route, Switch, Redirect } from 'react-router-dom';

// application
import './index.css';
import { configure } from './store';
import MenuBar from './components/MenuBar';
import Networker from './components/Networker';
import PlayerScreen from './screens/PlayerScreen';
import SearchScreen from './screens/SearchScreen';

const App = () => (
  <div id="application">
    <div id="application-header" />
    <Switch>
      <Route path="/search"
        key="search-component"
        component={SearchScreen} />
      <Route path="/player"
        key="player-component"
        component={PlayerScreen} />
      <Redirect from="/" to="/player" />
    </Switch>
    <MenuBar />
    <Networker />
  </div>
);

// application
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
