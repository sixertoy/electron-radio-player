import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { pick } from './../../fp/pick';
import ListLayout from './../../hoc/ListLayout';
import { searchAuthorPodcasts } from './../../actions';

const whitelist = ['collectionId', 'collectionName', 'artistName'];

const renderItem = (item, dispatch) => {
  const picked = pick(item, whitelist);
  return (
    <button key={picked.collectionId}
      className="button list-item"
      onClick={() => dispatch(searchAuthorPodcasts(picked.artistName))}>
      <span className="name">
        <span>{picked.artistName}</span>
      </span>
      <i className="icon type-icon icon-rss" />
    </button>
  );
};

const SearchResults = ({
  items,
  dispatch,
}) => (
  <ListLayout id="searchresults">
    {items && items.map(item => renderItem(item, dispatch))}
  </ListLayout>
);

SearchResults.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.searches,
});

export default connect(mapStateToProps)(SearchResults);
