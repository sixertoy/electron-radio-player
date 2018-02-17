import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './search.css';
// import { isurl } from './../../fp/isurl';
import { slugify } from './../../fp/slugify';
import { searchAuthors } from './../../actions';

const INPUT_DELAY = 800;
const ENTER_CHAR_CODE = 13;

class Search extends React.PureComponent {

  constructor (props) {
    super(props);
    this.timer = null;
    this.state = { term: '' };
    this.onKeypress = this.onKeypress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onKeypress (evt) {
    const charcode = evt.charCode;
    const { location, dispatch } = this.props;
    if (charcode !== ENTER_CHAR_CODE) return;
    if (this.timer) clearTimeout(this.timer);
    const value = (evt.target.value || '').trim();
    if (value !== this.state.term) {
      this.setState({ term: value }, () => this.sendSearch(value));
    } else if (location !== 'player-search') {
      dispatch(replace('/player/search'));
    }
  }

  sendSearch (value) {
    const term = value.toLocaleLowerCase();
    if (term.trim() === '') return;
    this.props.dispatch(searchAuthors(term));
  }

  handleChange (evt) {
    const value = (evt.target.value || '').trim();
    if (value === this.state.term) return;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ term: value }, () => {
      // if (isurl(value)) this.props.dispatch(addStation(value));
      // else
      this.sendSearch(value);
    }), INPUT_DELAY);
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
            onKeyPress={this.onKeypress}
            placeholder="Search for podcasters, radios..." />
        </label>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default connect(state => ({
  location: slugify(state.router.location.pathname || ''),
}))(Search);
