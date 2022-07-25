import React from 'react';
import PropTypes from 'prop-types';
import { FaAngleLeft } from 'react-icons/fa';
import './Header.scss';

const OpenButton = ({ onClick, isOpen }) => {
  const status = isOpen ? 'open' : 'close';
  return (
    <button
      type="button"
      className={`Header__button ${status}`}
      onClick={onClick}
    >
      <FaAngleLeft />
    </button>
  );
};


export default OpenButton;

OpenButton.propTypes = {
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
};

OpenButton.defaultProps = {
  onClick: () => 1,
  isOpen: true,
};
