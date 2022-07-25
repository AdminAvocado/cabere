import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/roles';

export const dataOwnerAccess = (role) => () => {
  switch (role) {
    case ROLES.DATA_OWNER_ROLE: return { canView: true };
    case ROLES.DATA_ANALIST_ROLE: return { redirect: ROUTES.DATA_ANALIST_PAGE };
    case ROLES.SEARCH_ROLE: return { redirect: ROUTES.UNIQUE_QUERY_PAGE };
    case ROLES.BUSINESS_OWNER_ROLE: return { redirect: ROUTES.BUSINESS_OWNER_PAGE };
    default:
      return { canView: false, redirect: '/not-found' };
  }
};

export const dataAnalistAccess = (role) => () => {
  switch (role) {
    case ROLES.DATA_OWNER_ROLE: return { redirect: ROUTES.DATA_OWNER_PAGE };
    case ROLES.DATA_ANALIST_ROLE: return { canView: true };
    case ROLES.SEARCH_ROLE: return { redirect: ROUTES.UNIQUE_QUERY_PAGE };
    case ROLES.BUSINESS_OWNER_ROLE: return { redirect: ROUTES.BUSINESS_OWNER_PAGE };
    default:
      return { canView: false, redirect: '/not-found' };
  }
};

export const uniqueQueryAccess = (role) => () => {
  switch (role) {
    case ROLES.SEARCH_ROLE: return { canView: true };
    case ROLES.DATA_OWNER_ROLE: return { redirect: ROUTES.DATA_OWNER_PAGE };
    case ROLES.DATA_ANALIST_ROLE: return { redirect: ROUTES.DATA_ANALIST_PAGE };
    case ROLES.BUSINESS_OWNER_ROLE: return { redirect: ROUTES.BUSINESS_OWNER_PAGE };
    default:
      return { canView: false, redirect: '/not-found' };
  }
};

export const businessOwnerAccess = (role) => () => {
  console.log(role);
  switch (role) {
    case ROLES.BUSINESS_OWNER_ROLE: return { canView: true };
    case ROLES.SEARCH_ROLE: return { redirect: ROUTES.UNIQUE_QUERY_PAGE };
    case ROLES.DATA_OWNER_ROLE: return { redirect: ROUTES.DATA_OWNER_PAGE };
    case ROLES.DATA_ANALIST_ROLE: return { redirect: ROUTES.DATA_ANALIST_PAGE };
    default:
      return { canView: false, redirect: '/not-found' };
  }
};
