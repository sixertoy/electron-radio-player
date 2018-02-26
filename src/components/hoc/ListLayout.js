import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// application
import './listlayout.css';

const ListLayout = ({
  id,
  children,
}) => (
  <Scrollbars id={id}
    autoHide
    autoHideTimeout={0}
    className="scrollbox-list">
    <TransitionGroup component="div">
      {children && children.map(child => (
        <CSSTransition timeout={{ enter: 0, exit: 0 }}
          classNames="animated-list-item"
          key={`scrollbox-list-item-${child.key}`}>
          <div className="scrollbox-list-item">
            {child}
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </Scrollbars>
);

ListLayout.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default ListLayout;
