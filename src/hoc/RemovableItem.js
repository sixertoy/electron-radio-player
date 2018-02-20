import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './removableitem.css';
import { noop } from './../fp/noop';

const RemovableItem = ({
  removable,
  itemRenderer,
  removeHandler,
}) => (
  <div className={`removable-container ${removable ? 'isremovable' : ''}`}
    // prevent phase capture onClick
    onClickCapture={!removable ? noop : (evt) => {
      evt.stopPropagation();
      removeHandler();
    }}>
    <div className="removable-item">
      {itemRenderer()}
    </div>
    <div className="removable-button">
      <i className="icon icon-minus-circled" />
    </div>
  </div>
);

RemovableItem.propTypes = {
  removable: PropTypes.bool.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  removable: state.removable,
});

export default connect(mapStateToProps)(RemovableItem);
