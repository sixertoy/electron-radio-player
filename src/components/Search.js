import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { searchpodcast } from './../actions';

class Search extends React.Component {

  constructor (props) {
    super(props);
    this.timer = null;
    this.state = { term: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    const { value } = evt.target;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ term: value }, () =>
        this.props.dispatch(searchpodcast(value)));
    }, 800);
  }

  render () {
    const { term } = this.state;
    return (
      <div>
        <label htmlFor="searchfield">
          <span><span>Search</span></span>
          <input type="text"
            id="searchfield"
            name="searchfield"
            defaultValue={term}
            onChange={this.handleChange}
            placeholder="Search a podcast" />
        </label>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Search);
