import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import './searchinput.css';
import { submitInput, inputChange, clearSearch } from './../../actions';

const ENTER_CHAR_CODE = 13;

class SearchInput extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state = { term: '' };
    this.actions = bindActionCreators(
      { submitInput, inputChange, clearSearch },
      props.dispatch,
    );
    this.keyPressed = this.keyPressed.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
  }

  clearHandler () {
    this.setState({ term: '' }, () => this.actions.clearSearch());
  }

  inputChange (evt) {
    const term = ((evt && evt.target.value) || '');
    if ((term !== '') && (term === this.state.term)) return;
    this.setState(() => ({ term }), () => this.actions.inputChange(term));
  }

  keyPressed (evt) {
    // const { autorefresh } = this.props;
    if (evt.charCode !== ENTER_CHAR_CODE) return;
    this.actions.submitInput();
  }

  render () {
    // https://chai5she.cdn.dvmr.fr/fip-midfi.mp3?ID=radiofrance
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
            placeholder="Add a new Radio" />
        </label>
        <button className="button"
          disabled={!term}
          onClick={this.clearHandler}>
          <i className="icon icon-cancel-circled" />
        </button>
      </div>
    );
  }
}

SearchInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  // autorefresh: PropTypes.bool.isRequired,
  // createStation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { pathname } = state.router.location;
  // const autorefresh = (pathname === '/player/searchresults');
  const disabled = (pathname === '/player/create' || pathname === '/player/podcasts');
  return ({
    disabled,
    // autorefresh,
  });
};

/*
const mapDispatchToProps = dispatch => ({
  submitInput: () => {
    dispatch(submitInput());
    // https://chai5she.cdn.dvmr.fr/fip-midfi.mp3?ID=radiofrance
    // http://feeds.soundcloud.com/users/soundcloud:users:287468270/sounds.rss
    // dispatch(formCreate({ url: term.trim(), type }));
    // dispatch(push('/player/create'));
  },
  inputChange: (term) => {
    dispatch(inputChange(term));
  },
  sendSearch: () => {
    dispatch(push('/player/searchresults'));
  },
  clearSearch: () => {
    dispatch(clearSearch());
  },
});
*/

export default connect(mapStateToProps)(SearchInput);
