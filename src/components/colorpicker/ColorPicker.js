import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { Hue, EditableInput, Saturation } from 'react-color/lib/components/common';

import './colorpicker.css';

const ChromePointer = () => (
  <div style={{
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    transform: 'translate(-6px, -1px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  }} />
);

const pickerStyles = {
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
};

const CustomColorPicker = ({
  hsl, hsv, hex, onChange,
}) => (
  <div className="color-picker">
    <div className="color-picker-editable">
      <EditableInput style={pickerStyles} value={hex} onChange={onChange} />
    </div>
    <div className="color-picker-hue">
      <Hue hsl={hsl} onChange={onChange} direction="horizontal" pointer={ChromePointer} />
    </div>
    <div className="color-picker-saturation">
      <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
    </div>
  </div>
);

CustomColorPicker.defaultProps = {
  hsl: null,
  hex: null,
  hsv: null,
  onChange: null,
};

CustomColorPicker.propTypes = {
  hex: PropTypes.string,
  hsl: PropTypes.object,
  hsv: PropTypes.object,
  onChange: PropTypes.func,
};

export default CustomPicker(CustomColorPicker);
