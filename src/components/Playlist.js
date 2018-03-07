import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import ListLayout from './hoc/ListLayout';
import EditableItem from './hoc/EditableItem';
import { play, pause, resume, removeStation, formEdit } from './../actions';

class Playlist extends React.PureComponent {
  constructor (props) {
    super(props);
    const { playlist, dispatch } = this.props;
    this.editItem = this.editItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.radioClick = this.radioClick.bind(this);
    this.actions = bindActionCreators(
      {
        play,
        pause,
        resume,
        formEdit,
        removeStation,
      },
      dispatch,
    );
    this.state = {
      selected: false,
      items: [].concat(playlist),
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
    const { paused, buffering, editable } = this.props;
    if (buffering || editable) return;
    const item = items[index];
    this.setState({ selected: index }, () => {
      const isplayed = selected === index;
      if (!isplayed) this.actions.play(item);
      else if (paused) this.actions.resume(item);
      else this.actions.pause();
    });
  }

  editItem (index) {
    const { items } = this.state;
    const item = items[index];
    this.actions.formEdit(item);
  }

  removeItem (index) {
    const { selected, items } = this.state;
    const { key } = items[index];
    if (selected === index) this.actions.pause();
    this.setState(
      prev => ({ items: prev.items.filter(obj => obj.key !== key) }),
      () => this.actions.removeStation(key),
    );
  }

  renderItem (index) {
    const { items, selected } = this.state;
    const { buffering, buffererror } = this.props;
    const item = items[index];
    const isactive = index === selected && !buffererror;
    const isbuffering = isactive && buffering;
    const clickHandler = item.type === 'radio' ? () => this.radioClick(index) : () => {};
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
  dispatch: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  buffering: PropTypes.bool.isRequired,
  playlist: PropTypes.array.isRequired,
  buffererror: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  editable: state.editable,
  playlist: state.playlist,
  buffering: state.buffering,
  buffererror: state.buffererror && typeof state.buffererror === 'string',
});

export default connect(mapStateToProps)(Playlist);
