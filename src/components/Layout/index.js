/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RSidebar from 'react-sidebar';
import PropTypes from 'prop-types';

const Layout = (props) => {
  const {
    pullRight, shadow, children, ...others
  } = props;
  return (<RSidebar shadow={shadow} pullRight={pullRight} {...others}>{ children }</RSidebar>);
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  pullRight: PropTypes.bool,
  shadow: PropTypes.bool,
};

Layout.defaultProps = {
  pullRight: true,
  shadow: false,
};
export default Layout;
