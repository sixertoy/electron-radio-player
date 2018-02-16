import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// application
import { pick } from './../../fp/pick';

const whitelist = ['artistId', 'artistName'];

const SearchResults = ({
  searches,
}) => (
  <div className="scrollbox">
    <Scrollbars className="scrollbox-list">
      {searches && searches.map((item) => {
        const picked = pick(item, whitelist);
        return (
          <button key={picked.artistId}
            className="item"
            onClick={() => {}}>
            <span className="name">{picked.artistName}</span>
          </button>
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
