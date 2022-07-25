/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonBM from 'react-bootstrap/Button';
import './Button.scss';

const Button = (props) => {
  const { children, className, ...others } = props;
  return (
    <ButtonBM
      className={`Button ${className}`}
      {...others}
    >
      {children}
    </ButtonBM>
  );
};


Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.shape({}),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  className: '',
  onClick: PropTypes.func,
};

export default Button;
