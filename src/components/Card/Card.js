import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = (props) => {
  const { children, className } = props;
  return (
    <div className={`Card ${className}`}>
      {children}
    </div>
  );
};


Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;
