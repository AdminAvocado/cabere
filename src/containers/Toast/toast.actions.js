import {
  SHOW_TOAST,
  HIDE_TOAST,
} from 'constants/actionTypes';

export const showToast = (config) => ({ type: SHOW_TOAST, config });
export const hideToast = () => ({ type: HIDE_TOAST });
