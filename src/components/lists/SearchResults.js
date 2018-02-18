import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { pick } from './../../fp/pick';
import ListLayout from './../../hoc/ListLayout';
import { searchPodcasts } from './../../actions';

const whitelist = ['collectionId', 'collectionName', 'artistName'];

const renderItem = (item, dispatch) => {
  const picked = pick(item, whitelist);
  return (
    <button key={picked.collectionId}
      className="item"
      onClick={() => dispatch(searchPodcasts(picked.artistName))}>
      <span className="name">
        <b>{picked.artistName}</b>
        <b>{picked.collectionName}</b>
      </span>
    </button>
  );
};

const SearchResults = ({
  items,
  dispatch,
}) => (
  <ListLayout id="search-results">
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
