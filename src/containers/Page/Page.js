/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom';
import {
  dataAnalistAccess, dataOwnerAccess, uniqueQueryAccess, businessOwnerAccess,
} from 'utils/paths';
import ProtectedRoute from 'components/ProtectedRoute';
import * as ROUTES from 'constants/routes';
import DataOwnerP from '../DataOwner/DataOwnerPage';
import UniqueQueryP from '../UniqueQuery/UniqueQueryPage';
import FileStatusP from '../FileStatus/FileStatusPage';
import DataAnalistP from '../DataAnalist/DataAnalistPage';
import BusinessOwnerP from '../BusinessOwner/BusinessOwnerPage';
import HomeP from '../Home/HomePage';
import NotFoundP from '../NotFound/NotFoundPage';

const Page = ({ role, trigger }) => (
  <Container fluid="lg">
    <Switch>
      <Route exact path="/" render={() => <HomeP role={role} />} />
      <ProtectedRoute
        exact
        validation={dataOwnerAccess(role)}
        path={ROUTES.DATA_OWNER_PAGE}
        component={DataOwnerP}
      />
      <ProtectedRoute
        exact
        validation={dataOwnerAccess(role)}
        path={ROUTES.FILE_STATUS_PAGE}
        aditionalProps={{ trigger }}
        component={FileStatusP}
      />
      <ProtectedRoute
        exact
        validation={dataAnalistAccess(role)}
        path={ROUTES.DATA_ANALIST_PAGE}
        component={DataAnalistP}
      />
      <ProtectedRoute
        exact
        validation={uniqueQueryAccess(role)}
        path={ROUTES.UNIQUE_QUERY_PAGE}
        component={UniqueQueryP}
      />
      <ProtectedRoute
        exact
        validation={businessOwnerAccess(role)}
        path={ROUTES.BUSINESS_OWNER_PAGE}
        component={BusinessOwnerP}
      />
      <Route path="**" component={NotFoundP} />
    </Switch>
  </Container>
);


Page.propTypes = {
  trigger: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default Page;
