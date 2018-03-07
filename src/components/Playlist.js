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
      const isactive = selected === index;
      if (!isactive) this.actions.play(item);
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
    const item = items[index];
    const isactive = selected === index;
    if (isactive) this.actions.pause();
    this.setState(
      prev => ({
        items: prev.items.filter(obj => obj.id !== item.id),
        selected: isactive ? false : prev.selected,
      }),
      () => this.actions.removeStation(item.id),
    );
  }

  renderItem (index) {
    const { items } = this.state;
    const {
      buffering, buffererror, paused, source,
    } = this.props;
    const item = items[index];
    const isactive = source && source.id === item.id;
    const useplay = !isactive || paused;
    const usebuffer = buffering && isactive && !buffererror;
    const usepause = isactive && !paused && !usebuffer;
    const clickHandler = item.type === 'radio' ? () => this.radioClick(index) : () => {};
    return (
      <button key={item.id}
        className={`list-item button ${isactive ? 'active' : ''}`}
        onClick={clickHandler}>
        {useplay && <i className="icon icon-play" />}
        {usepause && <i className="icon icon-pause" />}
        {usebuffer && <i className="icon icon-spin6 animate-spin" />}
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
              <EditableItem key={item.id}
                editHandler={() => this.editItem(index)}
                itemRenderer={() => this.renderItem(index)}
                removeHandler={() => this.removeItem(index)} />
            ))}
        </ListLayout>
      </div>
    );
  }
}

Playlist.defaultProps = {
  source: null,
};

Playlist.propTypes = {
  source: PropTypes.object,
  paused: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  buffering: PropTypes.bool.isRequired,
  playlist: PropTypes.array.isRequired,
  buffererror: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  paused: state.paused,
  source: state.source,
  editable: state.editable,
  playlist: state.playlist,
  buffering: state.buffering,
  buffererror: state.buffererror && typeof state.buffererror === 'string',
});

export default connect(mapStateToProps)(Playlist);
