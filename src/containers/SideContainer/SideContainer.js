import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import DataOwnerSB from '../DataOwner/DataOwnerSideBar';
import DataAnalistSB from '../DataAnalist/DataAnalistSideBar';
import BusinessOwnerSB from '../BusinessOwner/BusinessOwnerSideBar';

import './SideContainer.scss';

const SideContainer = ({ onClose, isDocked, isOpen }) => (
  <div className="SideContainer open">
    {(isOpen && !isDocked) ? (
      <div className="SideContainer__close">
        <button type="button" onClick={onClose}>X</button>
      </div>
    ) : null}
    <Switch>
      <Route exact path={ROUTES.DATA_OWNER_PAGE} component={DataOwnerSB} />
      <Route exact path={ROUTES.DATA_ANALIST_PAGE} component={DataAnalistSB} />
      <Route exact path={ROUTES.BUSINESS_OWNER_PAGE} component={BusinessOwnerSB} />
      <Route exact path={ROUTES.BUSINESS_OWNER_PAGE} component={BusinessOwnerSB} />
    </Switch>
  </div>
);

SideContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isDocked: PropTypes.bool.isRequired,
};


export default SideContainer;
