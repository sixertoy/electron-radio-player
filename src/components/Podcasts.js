import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import ListLayout from './hoc/ListLayout';
import { slugify } from './../lib/slugify';

class Podcasts extends React.PureComponent {

  constructor (props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onPodcastClick = this.onPodcastClick.bind(this);
  }

  onPodcastClick (podcast, issubscribed) {
    console.log('podcast', podcast);
  }

  renderItem (podcast) {
    console.log('podcast', podcast);
    const { stationskeys } = this.props;
    const key = podcast.key || slugify(podcast.collectionName);
    const issubscribed = stationskeys.includes(key);
    return (
      <div className="list-item">
        <button key={`podcast_key::${key}`}
          className="button"
          onClick={() => this.onPodcastClick(podcast, issubscribed)}>
          <span className="name">
            <span>{podcast.name || podcast.collectionName}</span>
          </span>
          <i className={`icon icon-${issubscribed ? 'check' : 'plus'}`} />
        </button>
      </div>
    );
  }

  render () {
    const { collection } = this.props;
    return (
      <ListLayout id="podcasts">
        {(collection && collection.map(this.renderItem)) || []}
      </ListLayout>
    );
  }
}

Podcasts.propTypes = {
  collection: PropTypes.array.isRequired,
  stationskeys: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  collection: state.podcaster,
  stationskeys: state.stationskeys,
});

export default connect(mapStateToProps)(Podcasts);
