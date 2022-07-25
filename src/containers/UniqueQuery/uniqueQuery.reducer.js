
import {
  SEARCH_CLIENT_LOADING,
  SEARCH_CLIENT_FAILED,
  SEARCH_CLIENT_SUCCESS,
  CLEAN_INFO_CLIENT,
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  searchResult: null,
  error: null,
};

const uniqueQueryReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SEARCH_CLIENT_LOADING:
      return { ...state, isLoading: true, error: null };
    case SEARCH_CLIENT_SUCCESS: {
      const { client } = action.result.data;
      return { ...state, isLoading: false, searchResult: client[0] };
    }
    case SEARCH_CLIENT_FAILED:
      return {
        ...state, isLoading: false, error: action.error.response.data, searchResult: null,
      };
    case CLEAN_INFO_CLIENT:
      return { ...state, searchResult: null };
    default:
      return state;
  }
};

export default uniqueQueryReducer;
