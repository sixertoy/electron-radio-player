import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import BackButton from './menu/BackButton';
import SearchInput from './menu/SearchInput';
import CommitButton from './menu/CommitButton';
import RemovableButton from './menu/RemovableButton';

const MenuBar = ({
  canedit,
  cancommit,
}) => (
  <div id="menubar"
    className="flex-columns">
    {(!canedit || cancommit) && <BackButton />}
    <SearchInput />
    {canedit && <RemovableButton />}
    {(!canedit && cancommit) && <CommitButton />}
  </div>
);

MenuBar.propTypes = {
  canedit: PropTypes.bool.isRequired,
  cancommit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { pathname } = state.router.location;
  const canedit = (pathname === '/player');
  const cancommit = (pathname === '/player/create');
  return ({ canedit, cancommit });
};

export default connect(mapStateToProps)(MenuBar);
