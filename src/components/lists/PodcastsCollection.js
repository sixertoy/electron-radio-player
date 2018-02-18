import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { pick } from './../../fp/pick';
import ListLayout from './../../hoc/ListLayout';
import { searchPodcasts } from './../../actions';

const whitelist = ['artistId', 'artistName'];

const renderItem = (item, dispatch) => {
  const picked = pick(item, whitelist);
  return (
    <button key={picked.artistId}
      className="item"
      onClick={() => dispatch(searchPodcasts(picked.artistName))}>
      <span className="name">{picked.artistName}</span>
    </button>
  );
};

const PodcastsCollection = ({
  items,
  dispatch,
}) => (
  <ListLayout id="podcasts-collection">
    {items && items.map(item => renderItem(item, dispatch))}
  </ListLayout>
);

PodcastsCollection.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.podcasts,
});

export default connect(mapStateToProps)(PodcastsCollection);
