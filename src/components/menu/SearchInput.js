import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// application
import './searchinput.css';
import { isPodcast, isRadio } from './../../fp/isurl';
import { searchPodcasts, createStation } from './../../actions';

const INPUT_DELAY = 800;
const ENTER_CHAR_CODE = 13;

class Search extends React.PureComponent {

  constructor (props) {
    super(props);
    this.timer = null;
    this.state = { term: '' };
    this.keyPressed = this.keyPressed.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange (evt, isenter) {
    if (this.timer) clearTimeout(this.timer);
    const value = ((evt && evt.target.value) || '');
    const isequal = (value.trim() === this.state.term);
    if (!isenter && isequal) return;
    this.timer = setTimeout(() => this.setState(
      prev => ({ term: value || prev.term }),
      () => this.props.sendSearch(this.state.term, isequal),
    ), (isenter || INPUT_DELAY));
  }

  keyPressed (evt) {
    const isenter = (evt.charCode === ENTER_CHAR_CODE);
    if (!isenter) return;
    this.inputChange(null, true);
  }

  render () {
    const { term } = this.state;
    const { routepath } = this.props;
    return (
      <div id="search-form"
        className="form">
        <label htmlFor="searchfield">
          <input type="text"
            id="searchfield"
            name="searchfield"
            defaultValue={term}
            onChange={this.inputChange}
            onKeyPress={this.keyPressed}
            disabled={routepath === '/player/create'}
            placeholder="Search for podcasters, radios..." />
        </label>
      </div>
    );
  }
}

Search.propTypes = {
  sendSearch: PropTypes.func.isRequired,
  routepath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  routepath: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  sendSearch: (term) => {
    // http://feeds.soundcloud.com/users/soundcloud:users:287468270/sounds.rss
    const isradio = isRadio(term);
    const ispodcast = isPodcast(term);
    if (ispodcast || isradio) {
      const type = ispodcast ? 'podcast' : 'radio';
      dispatch(createStation(term, type));
      dispatch(replace('/player/create'));
    } else {
      dispatch(searchPodcasts(term));
      dispatch(replace('/player/search'));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
