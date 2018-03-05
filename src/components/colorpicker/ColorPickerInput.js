import React from 'react';
import PropTypes from 'prop-types';

import './colorpickerinput.css';
import ColorPicker from './ColorPicker';

const ENTER_CHAR_CODE = 13;

class ColorInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.container = null;
    this.state = { opened: false };
    this.onChange = this.onChange.bind(this);
    this.togglePopin = this.togglePopin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidUpdate () {
    const { opened } = this.state;
    if (opened) {
      document.addEventListener('keypress', this.handleKeyPress);
      document.addEventListener('mousedown', this.handleClickOutside);
    } else {
      document.removeEventListener('keypress', this.handleKeyPress);
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentWillUnmount () {
    const { opened } = this.state;
    if (!opened) return;
    document.removeEventListener('keypress', this.handleKeyPress);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChange ({ hex }) {
    const { name, onChange } = this.props;
    onChange({ name, value: hex });
  }

  togglePopin () {
    this.setState(prev => ({ opened: !prev.opened }));
  }

  handleKeyPress (evt) {
    const { opened } = this.state;
    const isenter = evt.charCode === ENTER_CHAR_CODE;
    if (!opened || !isenter) return;
    this.setState({ opened: false });
  }

  handleClickOutside (evt) {
    const { opened } = this.state;
    if (!opened || !this.container || this.container.contains(evt.target)) return;
    this.setState({ opened: false });
  }

  render () {
    const { opened } = this.state;
    const { color, name } = this.props;
    return (
      <div key={name}
        className={`color-picker-input ${opened ? 'opened' : ''}`}
        ref={(elt) => {
          this.container = elt;
        }}>
        <button onClick={this.togglePopin}>
          <span style={{ backgroundColor: color }} />
          <span>{color}</span>
        </button>
        <input type="hidden" name={name} defaultValue={color} />
        <div className="popup">
          {!opened ? null : (
            <ColorPicker color={color} onChange={this.onChange} onChangeComplete={this.onChange} />
          )}
        </div>
      </div>
    );
  }
}

ColorInput.defaultProps = {};

ColorInput.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorInput;
