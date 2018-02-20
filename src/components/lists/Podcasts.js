import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { pick } from './../../fp/pick';
import ListLayout from './../../hoc/ListLayout';
import { searchPodcasters } from './../../actions';

const whitelist = ['artistId', 'artistName'];

const renderItem = (item, dispatch) => {
  const picked = pick(item, whitelist);
  return (
    <button key={picked.artistId}
      className="list-item button"
      onClick={() => dispatch(searchPodcasters(picked.artistName))}>
      <span className="name">
        <span>{picked.artistName}</span>
      </span>
      <i className="icon type-icon icon-rss" />
    </button>
  );
};

const Podcasts = ({
  items,
  dispatch,
}) => (
  <ListLayout id="podcasts">
    {items && items.map(item => renderItem(item, dispatch))}
  </ListLayout>
);

Podcasts.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.podcasts,
});

export default connect(mapStateToProps)(Podcasts);
