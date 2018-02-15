import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './search.css';
import { search } from './../actions';

const INPUT_DELAY = 800;

class Search extends React.Component {

  constructor (props) {
    super(props);
    this.timer = null;
    this.state = { term: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  sendSearch (value) {
    const term = value.toLocaleLowerCase().trim();
    if (term.trim() === '') return;
    const req = `attribute=authorTerm&entity=podcast&term=${term}`;
    this.props.dispatch(search(req));
  }

  handleChange (evt) {
    const { value } = evt.target;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() =>
      this.setState({ term: value }, () => this.sendSearch(value)), INPUT_DELAY);
  }

  render () {
    const { term } = this.state;
    return (
      <div id="search-form">
        <label htmlFor="searchfield">
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
