import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import BackButton from './menu/BackButton';
import SearchInput from './menu/SearchInput';
import CommitButton from './menu/CommitButton';
import RemovableButton from './menu/RemovableButton';

const MenuBar = ({
  ishome, cancommit, playlist, toasts,
}) => (
  <div id="menubar" className="flex-columns">
    {!ishome && <BackButton />}
    <SearchInput disabled={!ishome && cancommit} playlist={playlist} />
    {ishome && <RemovableButton />}
    {!toasts.length && !ishome && cancommit && <CommitButton />}
  </div>
);

MenuBar.propTypes = {
  ishome: PropTypes.bool.isRequired,
  toasts: PropTypes.array.isRequired,
  playlist: PropTypes.array.isRequired,
  cancommit: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  router, form, playlist, toasts,
}) => {
  const { pathname } = router.location;
  const ishome = pathname === '/player';
  const cancommit = Boolean(form && form.url);
  return {
    ishome,
    toasts,
    playlist,
    cancommit,
  };
};

export default connect(mapStateToProps)(MenuBar);
