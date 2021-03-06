import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './volumebar.css';
import { setVolume } from './../../actions';

class VolumeBar extends React.PureComponent {

  constructor (props) {
    super(props);
    this.timer = null;
    this.volumebar = null;
    this.state = { width: 0, left: 0 };
    this.mouseHandler = this.mouseHandler.bind(this);
    this.windowResize = this.windowResize.bind(this);
    this.setVolumebarRef = this.setVolumebarRef.bind(this);
  }

  componentDidMount () {
    this.windowResize();
  }

  componentWillUnmount () {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    this.volumebar = null;
    window.removeEventListener('resize', this.windowResize);
  }

  setVolumebarRef (ref) {
    this.volumebar = ref;
    window.addEventListener('resize', this.windowResize);
  }

  mouseHandler (evt) {
    const { dispatch } = this.props;
    const { width, left } = this.state;
    const size = (evt.clientX - left);
    const volumepercent = ((100 * size) / width);
    dispatch(setVolume(volumepercent));
  }

  windowResize () {
    if (!this.volumebar) return;
    // delay window resize event
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const { width, left } = this.volumebar.getBoundingClientRect();
      this.setState({ width, left });
    }, 250);
  }

  render () {
    const { muted, volume, active } = this.props;
    const thumbwidth = (volume * 100);
    return (
      <div id="volume-bar"
        className={`${active ? 'active' : ''} ${muted ? 'muted' : ''}`}>
        <div className="bar"
          ref={this.setVolumebarRef}>
          <span className="ruler"
            tabIndex="0"
            role="button"
            onMouseUp={this.mouseHandler}>
            <span className="track" />
            <span className="thumb"
              style={{ width: `${thumbwidth}%` }} />
          </span>
        </div>
      </div>
    );
  }
}

VolumeBar.defaultProps = {
  active: null,
};

VolumeBar.propTypes = {
  active: PropTypes.bool,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(VolumeBar);
