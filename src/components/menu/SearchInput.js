import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './searchinput.css';
import { isRadio, isPodcast } from './../../lib/isurl';
import { searchPodcasters, formCreate } from './../../actions';

const ENTER_CHAR_CODE = 13;

class SearchInput extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state = { term: '' };
    this.clearTerm = this.clearTerm.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  clearTerm () {
    const { closeSearch } = this.props;
    this.setState({ term: '' }, () => closeSearch());
  }

  inputChange (evt) {
    const term = ((evt && evt.target.value) || '');
    if ((term !== '') && (term === this.state.term)) return;
    this.setState(() => ({ term }));
  }

  keyPressed (evt) {
    const { term } = this.state;
    const { routepath } = this.props;
    if (evt.charCode !== ENTER_CHAR_CODE) return;
    const ispodcast = isPodcast(term);
    if (ispodcast || isRadio(term)) {
      const type = ispodcast ? 'podcast' : 'radio';
      this.props.createStation(term, type);
    } else if (term !== '') {
      this.props.sendSearch(term);
    } else if (routepath !== '/player') {
      this.props.closeSearch();
    }
  }

  render () {
    const { term } = this.state;
    const { routepath } = this.props;
    return (
      <div id="search-form"
        className="form flex-columns">
        <label htmlFor="searchfield">
          <input type="text"
            id="searchfield"
            name="searchfield"
            value={term}
            onChange={this.inputChange}
            onKeyPress={this.keyPressed}
            disabled={routepath === '/player/create'}
            placeholder="Search for podcasters, radios" />
        </label>
        <button className="button"
          disabled={!term}
          onClick={this.clearTerm}>
          <i className="icon icon-cancel-circled" />
        </button>
      </div>
    );
  }
}

SearchInput.propTypes = {
  sendSearch: PropTypes.func.isRequired,
  routepath: PropTypes.string.isRequired,
  closeSearch: PropTypes.func.isRequired,
  createStation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  routepath: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  createStation: (term, type) => {
    // http://feeds.soundcloud.com/users/soundcloud:users:287468270/sounds.rss
    dispatch(formCreate({ url: term.trim(), type }));
    dispatch(replace('/player/create'));
  },
  sendSearch: (term) => {
    dispatch(searchPodcasters(term.trim()));
    dispatch(replace('/player/searchresults'));
  },
  closeSearch: () => {
    dispatch(replace('/player'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput);
