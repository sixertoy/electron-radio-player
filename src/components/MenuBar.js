import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import BackButton from './menu/BackButton';
import SearchInput from './menu/SearchInput';
import CommitButton from './menu/CommitButton';
import ToggleEditButton from './menu/ToggleEditButton';

const MenuBar = ({
  ishome, cancommit, playlist, toasts, isform,
}) => (
  <div id="menubar" className="flex-columns">
    {!ishome && <BackButton />}
    <SearchInput disabled={!ishome && cancommit} playlist={playlist} hide={isform} />
    {ishome && <ToggleEditButton />}
    {!toasts.length && !ishome && cancommit && <CommitButton />}
  </div>
);

MenuBar.propTypes = {
  ishome: PropTypes.bool.isRequired,
  isform: PropTypes.bool.isRequired,
  toasts: PropTypes.array.isRequired,
  playlist: PropTypes.array.isRequired,
  cancommit: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  router, form, playlist, toasts,
}) => {
  const { pathname } = router.location;
  const ishome = pathname === '/player';
  const isform = pathname === '/player/create';
  const cancommit = Boolean(form && form.url);
  return {
    isform,
    ishome,
    toasts,
    playlist,
    cancommit,
  };
};

export default connect(mapStateToProps)(MenuBar);
