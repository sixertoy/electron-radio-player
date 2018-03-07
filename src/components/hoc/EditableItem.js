import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './editableitem.css';
import { noop } from './../../lib/noop';

const EditableItem = ({ editable, itemRenderer, removeHandler }) => (
  <div className={`editable-container ${editable ? 'iseditable' : ''}`}>
    <div className="editable-item">{itemRenderer()}</div>
    <button className="editable-button" onClick={!editable ? noop : removeHandler}>
      <i className="icon icon-minus-circled" />
    </button>
  </div>
);

EditableItem.propTypes = {
  editable: PropTypes.bool.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editable: state.editable,
});

export default connect(mapStateToProps)(EditableItem);
