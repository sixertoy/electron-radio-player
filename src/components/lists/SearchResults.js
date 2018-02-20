import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import { subscribe } from './../../actions';
import { slugify } from './../../fp/slugify';
import ListLayout from './../../hoc/ListLayout';

const renderItem = (artistname, count, clickHandler) => (
  <button key={slugify(artistname)}
    className="button list-item"
    onClick={clickHandler}>
    <span className="name">
      <span>{artistname}</span>
    </span>
    <span className={`${count > 1 ? 'badge' : 'type'}-icon`}>
      {(count > 1
        ? (<span>{count}</span>)
        : (<i className="icon icon-podcast" />))}
    </span>
  </button>
);

const SearchResults = ({ items, ...props }) => (
  <ListLayout id="searchresults">
    {((items && items.podcasters && Object.keys(items.podcasters)
      .map((key) => {
        const podcasts = items.podcasters[key];
        const count = podcasts.length;
        return renderItem(key, count, () => (count > 1
          ? () => {}
          : props.subscribe(podcasts[0])));
      })) || [])}
  </ListLayout>
);

SearchResults.propTypes = {
  items: PropTypes.object.isRequired,
  subscribe: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.searches,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ subscribe }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
