import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './podcasts.css';
import ListLayout from './hoc/ListLayout';
import { slugify } from './../lib/slugify';
import { subscribePodcast, unsubscribePodcast } from './../actions';

class Podcasts extends React.PureComponent {

  constructor (props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem (podcast) {
    const { subkeys, subscribe, unsubscribe } = this.props;
    const key = podcast.key || slugify(podcast.collectionName);
    const issubscribed = subkeys.includes(key);
    return (
      <button key={`podcast_key::${key}`}
        className="list-item button"
        onClick={() => {
          if (issubscribed) subscribe(podcast);
          else unsubscribe(podcast);
        }}>
        <span className="name">
          <span>{podcast.name || podcast.collectionName}</span>
        </span>
        <i className={`icon type-icon icon-${issubscribed ? 'check' : 'plus'}`} />
      </button>
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
  subscribe: PropTypes.func.isRequired,
  collection: PropTypes.array.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  subkeys: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  collection: state.podcaster,
  subkeys: state.subkeys,
});

const mapDispatchToProps = dispatch => ({
  subscribe: podcast => dispatch(subscribePodcast(podcast)),
  unsubscribe: podcast => dispatch(unsubscribePodcast(podcast)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Podcasts);
