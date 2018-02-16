import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './search.css';
import { searchAuthors } from './../../actions';

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
    this.props.dispatch(searchAuthors(term));
  }

  handleChange (evt) {
    const { value } = evt.target;
    // const locale = window.NodeContext.getLocale();
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ term: value }, () =>
      this.sendSearch(value)), INPUT_DELAY);
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
            placeholder="Search for podcasters, radios..." />
        </label>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Search);
