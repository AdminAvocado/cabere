import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FILE_STATUS_PAGE } from 'constants/routes';
import { DATA_OWNER_ROLE } from 'constants/roles';

import Menu from '../Menu';
import Logo from '../Logo';
import SideBarButton from './OpenButton';
import './Header.scss';

export const Header = (props) => {
  const {
    isDocked, handleOpenSidebar, isOpen, user,
  } = props;
  return (
    <header className="Header">
      <Logo />
      <div style={{ flex: 1 }} />
      { user.role === DATA_OWNER_ROLE && (
        <Link className="Header__alerts" to={FILE_STATUS_PAGE}>
          <AiOutlineMail size={25} />
        </Link>
      )}
      <Menu uname={user.name} urole={user.role} email={user.email} />
      {!isDocked && !isOpen && <SideBarButton onClick={handleOpenSidebar} />}
    </header>
  );
};

Header.propTypes = {
  isDocked: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleOpenSidebar: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
  }),
};

Header.defaultProps = {
  isOpen: false,
  isDocked: false,
  handleOpenSidebar: () => 1,
  user: {
    name: '',
    role: '',
    email: '',
  },
};
export default Header;
