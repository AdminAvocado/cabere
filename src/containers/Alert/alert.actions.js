import {
  SHOW_ALERT,
  HIDE_ALERT,
} from 'constants/actionTypes';

export const showAlert = (alert) => ({ type: SHOW_ALERT, alert });

export const hideAlert = () => ({ type: HIDE_ALERT });
