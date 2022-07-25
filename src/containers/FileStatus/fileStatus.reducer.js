
import {
  GET_FILE_STATUS_FAILED,
  GET_FILE_STATUS_LOADING,
  GET_FILE_STATUS_SUCCESS,
  SET_USER_INFO,
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  fileStatuses: [],
  error: null,
  user: {},
};

const fileStatusReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, user: action.user };
    case GET_FILE_STATUS_LOADING:
      return { ...state, isLoading: true, error: null };
    case GET_FILE_STATUS_SUCCESS: {
      const { processState } = action.result.data;
      return { ...state, isLoading: false, fileStatuses: processState };
    }
    case GET_FILE_STATUS_FAILED:
      return {
        ...state, isLoading: false, error: action.error.response.data, searchResult: null,
      };
    default:
      return state;
  }
};

export default fileStatusReducer;
