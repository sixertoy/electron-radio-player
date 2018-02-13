import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './equalizer.css';
import './volumebar.css';
import { setVolume } from './../actions';

class VolumeBar extends React.Component {

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
    const {
      volume,
      isactive,
    } = this.props;
    const thumbwidth = (volume * 100);
    return (
      <div id="volume-bar" className={`${isactive ? 'active' : ''}`}>
        <span className="volume">
          <span className="equalizers">
            <span className="equalizer" />
          </span>
        </span>
        <div className="bar"
          ref={this.setVolumebarRef}>
          <span className="ruler"
            role="button"
            tabIndex="0"
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

VolumeBar.propTypes = {
  volume: PropTypes.number.isRequired,
  isactive: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(VolumeBar);
