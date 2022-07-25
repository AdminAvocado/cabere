import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineDownload,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineUser,
} from 'react-icons/ai';

import './Card.scss';

const resolveIcon = (icon) => {
  if (icon === 'AiOutlineDownload') return <AiOutlineDownload size={30} />;
  if (icon === 'AiOutlineUserAdd') return <AiOutlineUserAdd size={30} />;
  if (icon === 'AiOutlineUser') return <AiOutlineUser size={30} />;
  if (icon === 'AiOutlineUserDelete') return <AiOutlineUserDelete size={30} />;
  return null;
};
const CardHeader = (props) => {
  const { children, icon } = props;
  return (
    <div className="CardHeader">
      <div className="CardHeader__icon">
        {resolveIcon(icon)}
      </div>
      <div className="CardHeader__content">
        { children }
      </div>
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  icon: PropTypes.string.isRequired,
};

export default CardHeader;
