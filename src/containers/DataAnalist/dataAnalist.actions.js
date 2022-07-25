import { getStats as fetchStats, monthDetailData } from '../../services/statats.service';

import {
  GET_STATS_LOADING,
  GET_STATS_FAILED,
  GET_STATS_SUCCESS,
  GET_DETAIL_MONTH_DATA_SUCCESS,
  GET_DETAIL_MONTH_DATA_LOADING,
  GET_DETAIL_MONTH_DATA_FAILED,
} from '../../constants/actionTypes';

export const getDetailMonthData = (month, year, type) => {
  function onSuccess(result) { return ({ type: GET_DETAIL_MONTH_DATA_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_DETAIL_MONTH_DATA_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_DETAIL_MONTH_DATA_LOADING });

    return monthDetailData(month, year, type).then(
      (response) => dispatch(onSuccess(response)),
      (error) => {
        dispatch(onError(error));
      },
    );
  };
};

export const getStats = (year) => {
  function onSuccess(result) { return ({ type: GET_STATS_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_STATS_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_STATS_LOADING });

    return fetchStats(year).then(
      (response) => dispatch(onSuccess(response)),
      (error) => {
        dispatch(onError(error));
      },
    );
  };
};
