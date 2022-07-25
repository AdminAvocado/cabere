/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component, validation, aditionalProps, ...rest
}) => {
  const { canView, redirect } = validation();
  return (
    <Route
      {...rest}
      render={(props) => (
        canView
          ? <Component {...props} aditionalProps={aditionalProps} />
          : <Redirect to={`${redirect}`} />
      )}
    />
  );
};

ProtectedRoute.propTypes = {
  validation: PropTypes.func,
  aditionalProps: PropTypes.shape({}),
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.shape({}),
    PropTypes.func,
  ]),
};

ProtectedRoute.defaultProps = {
  validation: () => 1,
  component: null,
  aditionalProps: {},
};

export default ProtectedRoute;
