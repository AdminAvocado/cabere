import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ButtonLink.scss';

const ButtonLink = (props) => {
  const { to, children } = props;
  return (<Link to={to} className="ButtonLink">{ children }</Link>);
};

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ButtonLink;
