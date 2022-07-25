import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/roles';


export const HomePage = (props) => {
  const { role } = props;
  if (ROLES.DATA_OWNER_ROLE === role) return <Redirect to={ROUTES.DATA_OWNER_PAGE} />;
  if (ROLES.DATA_ANALIST_ROLE === role) return <Redirect to={ROUTES.DATA_ANALIST_PAGE} />;
  if (ROLES.SEARCH_ROLE === role) return <Redirect to={ROUTES.UNIQUE_QUERY_PAGE} />;
  if (ROLES.BUSINESS_OWNER_ROLE === role) return <Redirect to={ROUTES.BUSINESS_OWNER_PAGE} />;
  return (<Redirect to="/not-found" />);
};


HomePage.propTypes = {
  role: PropTypes.string.isRequired,
};


export default HomePage;
