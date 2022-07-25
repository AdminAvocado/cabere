
import { getCoverageCatalog as getCoverage } from 'services/catalog.service';
import { getDownloadFile as downloadFile } from 'services/file.service';
import {
  GET_COVERAGE_CAT_LOADING,
  GET_COVERGAE_CAT_SUCCESS,
  GET_COVERAGE_CAT_FAILED,
  GET_DOWNLOAD_FILE_LOADING,
  GET_DOWNLOAD_FILE_SUCCESS,
  GET_DOWNLOAD_FILE_FAILED,
} from 'constants/actionTypes';
import { showAlert } from 'containers/Alert/alert.actions';


/** Acciones para la carga del catalogo de coverturas */

export const getCoverageCatalog = (req = {}) => {
  function onSuccess(result) { return ({ type: GET_COVERGAE_CAT_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_COVERAGE_CAT_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_COVERAGE_CAT_LOADING });

    return getCoverage(req).then(
      (response) => dispatch(onSuccess(response)),
      (error) => {
        dispatch(onError(error));
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
  };
};

export const getDownloadfile = (req) => {
  function onSuccess(result) { return ({ type: GET_DOWNLOAD_FILE_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_DOWNLOAD_FILE_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_DOWNLOAD_FILE_LOADING });

    return downloadFile(req).then(
      (response) => dispatch(onSuccess(response)),
      (error) => {
        dispatch(onError(error));
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
  };
};
