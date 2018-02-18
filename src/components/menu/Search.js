import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './search.css';
import { searchPodcasts } from './../../actions';

const INPUT_DELAY = 800;
const ENTER_CHAR_CODE = 13;

class Search extends React.PureComponent {

  constructor (props) {
    super(props);
    this.timer = null;
    this.state = { term: '' };
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange (evt) {
    if (this.timer) clearTimeout(this.timer);
    const value = (evt.target.value || '');
    const isequal = (value.trim() === this.state.term);
    const isenter = (evt.charCode === ENTER_CHAR_CODE);
    if (!isenter && isequal) return;
    this.timer = setTimeout(() => this.setState(
      { term: value },
      () => this.props.sendSearch(value, isequal),
    ), (isenter || INPUT_DELAY));
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
            onKeyPress={this.inputChange}
            placeholder="Search for podcasters, radios..." />
        </label>
      </div>
    );
  }
}

Search.propTypes = {
  sendSearch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sendSearch: (term, isequal) => {
    dispatch(replace('/player/search'));
    if (isequal || (term.trim() === '' || term.trim().length < 3)) return;
    dispatch(searchPodcasts(term));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Search);
