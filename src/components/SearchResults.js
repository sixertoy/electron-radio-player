import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import ListLayout from './hoc/ListLayout';
import { slugify } from './../lib/slugify';

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
        return renderItem(key, count, () =>
          (props.openPodcasts(podcasts)));
      })) || [])}
  </ListLayout>
);

SearchResults.propTypes = {
  items: PropTypes.object.isRequired,
  openPodcasts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.searches,
});

const mapDispatchToProps = dispatch => ({
  openPodcasts: (podcaster) => {
    // dispatch(openPodcasts(podcaster));
    dispatch(replace('/player/podcasts'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
