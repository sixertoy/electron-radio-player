import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// application
import ListLayout from './hoc/ListLayout';
import EditableItem from './hoc/EditableItem';
import { play, pause, resume, removeStation } from './../actions';

class Playlist extends React.PureComponent {
  constructor (props) {
    super(props);
    this.editItem = this.editItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.radioClick = this.radioClick.bind(this);
    this.podcastClick = this.podcastClick.bind(this);
    this.state = {
      selected: false,
      items: [].concat(props.playlist),
    };
  }

  componentWillReceiveProps ({ playlist }) {
    if (playlist.length !== this.state.items.length) {
      // update state from props
      // only if add/remove radios from another component
      this.setState({ items: [].concat(playlist) });
    }
  }

  radioClick (index) {
    const { selected, items } = this.state;
    const { paused, buffering } = this.props;
    if (buffering) return;
    const item = items[index];
    this.setState({ selected: index }, () => {
      const isplayed = selected === index;
      if (!isplayed) this.props.play(item);
      else if (paused) this.props.resume(item);
      else this.props.pause();
    });
  }

  podcastClick (index) {
    const { openPodcasts, buffering } = this.props;
    if (buffering) return;
    const { items } = this.state;
    const item = items[index];
    openPodcasts(item);
  }

  editItem (index) {
    const { selected, items } = this.state;
    const { key } = items[index];
  }

  removeItem (index) {
    const { selected, items } = this.state;
    const { key } = items[index];
    const { remove } = this.props;
    if (selected === index) this.props.pause();
    this.setState(
      prev => ({ items: prev.items.filter(obj => obj.key !== key) }),
      () => remove(key),
    );
  }

  renderItem (index) {
    const { items, selected } = this.state;
    const { buffering, buffererror } = this.props;
    const item = items[index];
    const isactive = index === selected && !buffererror;
    const isbuffering = isactive && buffering;
    const clickHandler =
      item.type === 'radio' ? () => this.radioClick(index) : () => this.podcastClick(index);
    return (
      <button key={item.mtime}
        className={`list-item button ${isactive ? 'active' : ''}`}
        onClick={clickHandler}>
        {!isactive && !isbuffering && <i className="icon icon-play" />}
        {isactive && !isbuffering && <i className="icon icon-pause" />}
        {isbuffering && <i className="icon icon-spin6 animate-spin" />}
        <span className="name">
          <span>{item.name}</span>
        </span>
        <i className={`icon type-icon icon-${item.type}`} />
      </button>
    );
  }

  render () {
    const { items } = this.state;
    return (
      <div id="screen-playlist" className="page-screen">
        <ListLayout id="playlist">
          {items &&
            items.map((item, index) => (
              <EditableItem key={item.mtime}
                editHandler={() => this.editItem(index)}
                removeHandler={() => this.removeItem(index)}
                itemRenderer={() => this.renderItem(index)} />
            ))}
        </ListLayout>
      </div>
    );
  }
}

Playlist.propTypes = {
  paused: PropTypes.bool.isRequired,
  buffering: PropTypes.bool.isRequired,
  buffererror: PropTypes.bool.isRequired,
  playlist: PropTypes.array.isRequired,
  // actions
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  openPodcasts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  buffering: state.buffering,
  playlist: state.playlist,
  removable: state.removable,
  buffererror: state.buffererror && typeof state.buffererror === 'string',
});

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch(pause()),
  resume: () => dispatch(resume()),
  play: item => dispatch(play(item)),
  remove: key => dispatch(removeStation(key)),
  openPodcasts: () => {
    dispatch(push('/player/podcasts'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
