import {
  GET_FILE_STATUS_FAILED,
  GET_FILE_STATUS_LOADING,
  GET_FILE_STATUS_SUCCESS,
} from 'constants/actionTypes';

import {
  fetchFileStatus,
} from 'services/file.service';

import { showAlert } from 'containers/Alert/alert.actions';


export const getFileStatus = (req) => {
  function onSuccess(result) { return ({ type: GET_FILE_STATUS_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_FILE_STATUS_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_FILE_STATUS_LOADING });
    return fetchFileStatus(req).then(
      (response) => dispatch(onSuccess(response)),
      (error) => {
        dispatch(onError(error));
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
  };
};
