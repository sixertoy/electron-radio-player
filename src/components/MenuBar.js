import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import BackButton from './menu/BackButton';
import SearchInput from './menu/SearchInput';
import CommitButton from './menu/CommitButton';
import RemovableButton from './menu/RemovableButton';

const MenuBar = ({
  ishome,
  cancommit,
}) => (
  <div id="menubar"
    className="flex-columns">
    {(!ishome && !cancommit) && <BackButton />}
    <SearchInput disabled={cancommit} />
    {ishome && <RemovableButton />}
    {(!ishome && cancommit) && <CommitButton />}
  </div>
);

MenuBar.propTypes = {
  ishome: PropTypes.bool.isRequired,
  cancommit: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ router, form }) => {
  const { pathname } = router.location;
  const ishome = (pathname === '/player');
  const cancommit = Boolean(form && form.url);
  return ({ ishome, cancommit });
};

export default connect(mapStateToProps)(MenuBar);
