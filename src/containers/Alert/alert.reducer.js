
import {
  HIDE_ALERT,
  SHOW_ALERT,
} from '../../constants/actionTypes';

const initialState = {
  alert: {},
  show: false,
};

const alertReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { alert: action.alert, show: true };
    case HIDE_ALERT: {
      return { ...state, show: false };
    }
    default:
      return state;
  }
};

export default alertReducer;
