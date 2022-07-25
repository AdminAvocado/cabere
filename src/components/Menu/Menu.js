import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { MdKeyboardArrowDown } from 'react-icons/md';
import './Menu.scss';

import { Auth } from 'aws-amplify';


const doLogout = () => {
  Auth.signOut()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  window.location.reload();
};
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    className="Menu"
    type="button"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <div className="Menu__content">
      { children }
    </div>
    <div className="Menu__arrow">
      <MdKeyboardArrowDown />
    </div>
  </button>
));

CustomToggle.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onClick: PropTypes.func.isRequired,
};


const Menu = (props) => {
  const { uname, urole, email } = props;
  const logout = () => {
    doLogout();
  };
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <span className="Menu__username-label">
          { `${uname} - ${email}` }
        </span>
        <span className="Menu__role-label">
          { urole }
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          href="#/logout"
          onClick={logout}
        >
          <Text translationKey="logout" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

Menu.propTypes = {
  uname: PropTypes.string,
  urole: PropTypes.string,
  email: PropTypes.string,
};

Menu.defaultProps = {
  uname: 'Username',
  urole: 'Profile',
  email: 'email@email.com',
};

export default Menu;
