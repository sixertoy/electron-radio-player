import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './editableitem.css';
import { noop } from './../../lib/noop';

const EditableItem = ({
  editable, itemRenderer, editHandler, removeHandler,
}) => (
  <div className={`editable-container ${editable ? 'iseditable' : ''}`}>
    <div className="item">{itemRenderer()}</div>
    <button className="edit" onClick={!editable ? noop : editHandler}>
      <i className="icon icon-pencil" />
    </button>
    <button className="remove" onClick={!editable ? noop : removeHandler}>
      <i className="icon icon-minus-circled" />
    </button>
  </div>
);

EditableItem.propTypes = {
  editable: PropTypes.bool.isRequired,
  editHandler: PropTypes.func.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editable: state.editable,
});

export default connect(mapStateToProps)(EditableItem);
