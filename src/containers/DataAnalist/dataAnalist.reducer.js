import {
  GET_STATS_LOADING,
  GET_STATS_FAILED,
  GET_STATS_SUCCESS,
  GET_DETAIL_MONTH_DATA_SUCCESS,
  GET_DETAIL_MONTH_DATA_LOADING,
  GET_DETAIL_MONTH_DATA_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  data: [],
  error: null,
  monthDetail: [],
  monthDetailError: null,
};

const dataAnalist = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_DETAIL_MONTH_DATA_SUCCESS: {
      const data = action.result.data.detail || [];
      return { ...state, isLoadingMonthDetail: false, monthDetail: data };
    }
    case GET_DETAIL_MONTH_DATA_LOADING:
      return { ...state, isLoadingMonthDetail: true, monthDetailError: null };
    case GET_DETAIL_MONTH_DATA_FAILED:
      return { ...state, isLoadingMonthDetail: false, monthDetailError: action.error };
    case GET_STATS_LOADING:
      return { ...state, isLoading: true };
    case GET_STATS_SUCCESS: {
      const data = action.result.data.HistoricalData || [];
      return { ...state, isLoading: false, data };
    }
    case GET_STATS_FAILED:
      return { ...state, isLoading: false, error: action.error.response.data };
    default:
      return state;
  }
};

export default dataAnalist;
