import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import ListLayout from './hoc/ListLayout';

const renderItem = item => (
  <button key={`podcast_key::${item.key}`}
    className="list-item button"
    onClick={() => { /* load podcasts episode */ }}>
    <span className="name">
      <span>{item.name}</span>
    </span>
    <i className="icon type-icon icon-rss" />
  </button>
);

const Podcasts = ({
  podcasts,
}) => (
  <ListLayout id="podcasts">
    {(podcasts && Object.keys(podcasts)
      .map(key => renderItem(podcasts[key]))) || []}
  </ListLayout>
);

Podcasts.propTypes = {
  podcasts: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  podcasts: state.podcasts || {},
});

export default connect(mapStateToProps)(Podcasts);
