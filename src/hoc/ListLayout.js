import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { CSSTransitionGroup } from 'react-transition-group';

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
    <CSSTransitionGroup component="div"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionName="animated-list-item">
      {children.map(child => (
        <div key={`scrollbox-list-item-${child.key}`}
          className="scrollbox-list-item">
          {child}
        </div>
      ))}
    </CSSTransitionGroup>
  </Scrollbars>
);

ListLayout.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default ListLayout;
