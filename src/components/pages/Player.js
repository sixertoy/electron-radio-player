import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// application
import { slugify } from './../../lib/slugify';
import MenuBar from './../MenuBar';
import Podcasts from './../Podcasts';
import Playlist from './../Playlist';
import StationForm from './../StationForm';
import AudioPlayer from './../AudioPlayer';
import SearchResults from './../SearchResults';

class PlayerWindow extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state = { screenslug: props.screenslug };
  }

  componentWillReceiveProps ({ screenslug }) {
    if (screenslug !== this.state.screenslug) {
      this.setState({ screenslug });
    }
  }

  render () {
    const { screenslug } = this.state;
    return (
      <div id="page-player"
        className="app-page flex-rows">
        <AudioPlayer />
        <div className="page-screens-container">
          <div id="playlist-screen" className="page-screen">
            <Playlist />
          </div>
          <div id={screenslug} className="page-screen">
            <Switch>
              <Route exact path="/player/podcasts" component={Podcasts} />
              <Route exact path="/player/searchresults" component={SearchResults} />
              <Route exact path="/player/create" component={StationForm} />
            </Switch>
          </div>
          <MenuBar />
        </div>
      </div>
    );
  }
}

PlayerWindow.propTypes = {
  screenslug: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  let { pathname } = state.router.location;
  pathname = slugify(pathname || 'player');
  pathname = pathname.split('-');
  return ({
    screenslug: (pathname[1] ? `screen-${pathname[1]}` : ''),
  });
};

export default connect(mapStateToProps)(PlayerWindow);
