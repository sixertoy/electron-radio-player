import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    const { screenslug } = props;
    this.state = { screens: [], screenslug };
  }

  componentWillReceiveProps ({ screenslug }) {
    console.log('screenslug', screenslug);
    if (screenslug !== this.state.screenslug) {
      this.setState(() => ({
        screens: [].concat([
          screenslug === 'screen-podcasts'
            && { id: 'podcasts-screen', component: <Podcasts /> },
          screenslug === 'screen-searchresults'
            && { id: 'searchresults-screen', component: <SearchResults /> },
          screenslug === 'screen-create'
            && { id: 'create-screen', component: <StationForm /> },
        ]).filter(val => val),
      }));
    }
  }

  render () {
    const { screens } = this.state;
    return (
      <div id="page-player"
        className="app-page flex-rows">
        <AudioPlayer />
        <div className="page-screens-container">
          <div id="playlist-screen" className="page-screen">
            <Playlist />
          </div>
          {screens && screens.map(obj =>
            (<div id={obj.id}
              key={obj.id}
              className="page-screen">{obj.component}</div>))}
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
