import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

// application
import ListLayout from './hoc/ListLayout';
import { getSearchResults } from './../selectors/search';
import { openPodcasts, searchPodcasts } from './../actions';

const SEARCH_DELAY = 800;

class SearchResults extends React.PureComponent {

  constructor (props) {
    super(props);
    this.timer = null;
    const { term, results } = props;
    this.state = { enter: false, term, results };
  }

  componentWillMount () {
    this.setState({ enter: true });
  }

  componentDidMount () {
    const { term, results } = this.state;
    if (term !== '' && !results.length) {
      this.props.dispatch(searchPodcasts(term));
    }
  }

  componentWillReceiveProps (nextprops) {
    // FIXME cancel request on loading
    if (this.timer) clearTimeout(this.timer);
    const term = (nextprops.term.trim() !== ''
      && (nextprops.term !== this.state.term)
      && nextprops.term);
    if (term) {
      this.setState({ term });
      this.timer = setTimeout(() =>
        this.props.dispatch(searchPodcasts(term)), SEARCH_DELAY);
    }
  }

  componentWillUnmount () {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    this.setState({ enter: false });
  }

  render () {
    const { results, dispatch } = this.props;
    const classname = `page-screen-${this.state.enter ? 'in' : 'out'}`;
    return (
      <div id="screen-searchresults"
        className={`page-screen ${classname}`}>
        <ListLayout id="searchresults">
          {((results && results.map(({
            key,
            name,
            count,
            podcasts,
          }) => (
            <button key={key}
              className="button list-item"
              onClick={() => {
                dispatch(openPodcasts(podcasts));
                dispatch(push('/player/podcasts'));
              }}>
              <span className="name">
                <span>{name}</span>
              </span>
              <span className={`${count > 1 ? 'badge' : 'type'}-icon`}>
                {(count > 1
                  ? (<span>{count}</span>)
                  : (<i className="icon icon-podcast" />))}
              </span>
            </button>
          ))) || [])}
        </ListLayout>
      </div>
    );
  }
}

SearchResults.propTypes = {
  term: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  term: state.term,
  loading: state.loading,
  results: getSearchResults(state),
});

export default withRouter(connect(mapStateToProps)(SearchResults));
