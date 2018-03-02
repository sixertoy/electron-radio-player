import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';

// application
import './searchinput.css';
import { isRadio, isPodcast } from './../../lib/isurl';
import { formCreate, searchFor } from './../../actions';

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
    this.setState(() => ({ term }), () =>
      this.props.sendTerm(term));
  }

  keyPressed (evt) {
    const { term } = this.state;
    const { autorefresh } = this.props;
    if (evt.charCode !== ENTER_CHAR_CODE || autorefresh) return;
    const ispodcast = isPodcast(term);
    if (ispodcast || isRadio(term)) {
      const type = ispodcast ? 'podcast' : 'radio';
      this.props.createStation(term, type);
    } else {
      this.props.sendSearch();
    }
  }

  render () {
    const { term } = this.state;
    const { disabled } = this.props;
    return (
      <div id="search-form"
        className="form flex-columns">
        <label htmlFor="searchfield">
          <input type="text"
            id="searchfield"
            name="searchfield"
            value={term}
            disabled={disabled}
            onChange={this.inputChange}
            onKeyPress={this.keyPressed}
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
  sendTerm: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  sendSearch: PropTypes.func.isRequired,
  autorefresh: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
  createStation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { pathname } = state.router.location;
  const autorefresh = (pathname === '/player/searchresults');
  const disabled = (
    pathname === '/player/create'
    || pathname === '/player/podcasts'
  );
  return ({
    disabled,
    autorefresh,
  });
};

const mapDispatchToProps = dispatch => ({
  createStation: (term, type) => {
    // http://feeds.soundcloud.com/users/soundcloud:users:287468270/sounds.rss
    dispatch(formCreate({ url: term.trim(), type }));
    dispatch(push('/player/create'));
  },
  sendTerm: (term) => {
    dispatch(searchFor(term));
  },
  sendSearch: () => {
    dispatch(push('/player/searchresults'));
  },
  closeSearch: () => {
    dispatch(replace('/player'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput);
