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
  <Scrollbars className="podcasts-scrollbox">
    {searches && searches.map((item) => {
      const picked = pick(item, whitelist);
      return (
        <div key={picked.artistId}>
          <span>{picked.artistName}</span>
        </div>
      );
    })}
  </Scrollbars>
);

SearchResults.propTypes = {
  searches: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  searches: state.searches,
});

export default connect(mapStateToProps)(SearchResults);
