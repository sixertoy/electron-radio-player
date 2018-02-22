import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './searchinput.css';
import { isPodcast, isRadio } from './../../lib/isurl';
import { searchPodcasters, formCreate } from './../../actions';

const INPUT_DELAY = 800;
// const ENTER_CHAR_CODE = 13;

class SearchInput extends React.PureComponent {

  constructor (props) {
    super(props);
    this.timer = null;
    this.state = { term: props.term };
    // this.keyPressed = this.keyPressed.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange (evt, isenter) {
    if (this.timer) clearTimeout(this.timer);
    const term = ((evt && evt.target.value) || '');
    const isequal = (term.trim() === this.state.term);
    if (!isenter && isequal) return;
    const delay = (isenter || INPUT_DELAY);
    this.timer = setTimeout(() =>
      this.setState(prev => ({ term: term || prev.term }), () =>
        this.props.sendSearch(this.state.term, isequal)), delay);
  }

  /*
  keyPressed (evt) {
    const isenter = (evt.charCode === ENTER_CHAR_CODE);
    if (!isenter) return;
    this.inputChange(null, true);
  }
  */

  render () {
    const { routepath, term } = this.props;
    return (
      <div id="search-form"
        className="form">
        <label htmlFor="searchfield">
          <input type="text"
            id="searchfield"
            name="searchfield"
            defaultValue={term}
            onChange={this.inputChange}
            // onKeyPress={this.keyPressed}
            disabled={routepath === '/player/create'}
            placeholder="Search for podcasters, radios..." />
        </label>
      </div>
    );
  }
}

SearchInput.propTypes = {
  term: PropTypes.string.isRequired,
  sendSearch: PropTypes.func.isRequired,
  routepath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  term: state.term,
  routepath: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  sendSearch: (term) => {
    // http://feeds.soundcloud.com/users/soundcloud:users:287468270/sounds.rss
    const isradio = isRadio(term);
    const ispodcast = isPodcast(term);
    if (ispodcast || isradio) {
      const type = ispodcast ? 'podcast' : 'radio';
      dispatch(formCreate({ url: term, type }));
      dispatch(replace('/player/create'));
    } else {
      dispatch(searchPodcasters(term));
      dispatch(replace('/player/searchresults'));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput);
