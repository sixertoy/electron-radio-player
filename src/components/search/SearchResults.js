import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// application
import { pick } from './../../fp/pick';
import ScrollboxHeader from './../scrollbox/ScrollboxHeader';

const whitelist = ['artistId', 'artistName'];

const SearchResults = ({
  searches,
}) => (
  <div className="scrollbox">
    <ScrollboxHeader />
    <Scrollbars className="scrollbox-list">
      {searches && searches.map((item) => {
        const picked = pick(item, whitelist);
        return (
          <div key={picked.artistId}
            className="item">
            <span className="name">{picked.artistName}</span>
          </div>
        );
      })}
    </Scrollbars>
  </div>
);

SearchResults.propTypes = {
  searches: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  searches: state.searches,
});

export default connect(mapStateToProps)(SearchResults);
