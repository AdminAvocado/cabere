
import {
  HIDE_TOAST,
  SHOW_TOAST,
} from '../../constants/actionTypes';

const initialState = {
  config: {},
  show: false,
};

const toastReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { config: action.config, show: true };
    case HIDE_TOAST: {
      return { ...state, show: false, config: {} };
    }
    default:
      return state;
  }
};

export default toastReducer;
