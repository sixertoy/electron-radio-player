import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { pick } from './../../fp/pick';
import ListLayout from './../../hoc/ListLayout';

const whitelist = ['artistId', 'artistName'];

const renderItem = (item) => {
  const picked = pick(item, whitelist);
  return (
    <button key={picked.artistId}
      className="item"
      onClick={() => {}}>
      <span className="name">{picked.artistName}</span>
    </button>
  );
};

const SearchResults = ({
  items,
}) => (
  <ListLayout id="search-results">
    {items && items.map(renderItem)}
  </ListLayout>
);

SearchResults.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  items: state.searches,
});

export default connect(mapStateToProps)(SearchResults);
