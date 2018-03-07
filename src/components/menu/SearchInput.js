import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import './searchinput.css';
import { isRadio } from './../../lib/isurl';
import { submitInput, inputChange, clearSearch, addToast } from './../../actions';

const ENTER_CHAR_CODE = 13;

class SearchInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { term: '' };
    this.actions = bindActionCreators(
      {
        addToast,
        submitInput,
        inputChange,
        clearSearch,
      },
      props.dispatch,
    );
    this.keyPressed = this.keyPressed.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
  }

  componentWillReceiveProps ({ term }) {
    if (term === this.state.term) return;
    this.setState({ term });
  }

  clearHandler () {
    this.setState({ term: '' }, () => this.actions.clearSearch());
  }

  inputChange (evt) {
    const term = (evt && evt.target.value) || '';
    if (term !== '' && term === this.state.term) return;
    this.setState(() => ({ term }), () => this.actions.inputChange(term));
  }

  keyPressed (evt) {
    if (evt.charCode !== ENTER_CHAR_CODE) return;
    const { term } = this.state;
    const { playlist } = this.props;
    const isvalid = isRadio(term);
    const alreadyexists = (isvalid && playlist.filter(obj => obj.url === term)) || [];
    if (!isvalid) {
      this.actions.addToast(`“${term}” is not a valid URL`);
    } else if (alreadyexists.length) {
      this.actions.addToast(`Radio is already registered as “${alreadyexists[0].name}”`);
    } else {
      this.actions.submitInput();
    }
  }

  render () {
    // https://chai5she.cdn.dvmr.fr/fip-midfi.mp3?ID=radiofrance
    const { term } = this.state;
    const { disabled, hide } = this.props;
    return (
      <div id="search-form" className={`form flex-columns ${hide ? 'hidden' : ''}`}>
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
        <button className="button" disabled={!term} onClick={this.clearHandler}>
          <i className="icon icon-cancel-circled" />
        </button>
      </div>
    );
  }
}

SearchInput.propTypes = {
  hide: PropTypes.bool.isRequired,
  term: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  playlist: PropTypes.array.isRequired,
};

const mapStateToProps = ({ term }) => ({ term });

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
