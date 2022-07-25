import { getStats as fetchData } from 'services/statats.service';
import { fetchDataDetail } from 'services/data.service';
import {
  uploadFile, getUploadFileAccess, uploadLargeFile, fetchFileStatus,
} from 'services/file.service';
import { EXCEL_CONTENT_TYPE } from 'constants/files';
import { showAlert } from 'containers/Alert/alert.actions';
import { showToast, hideToast } from 'containers/Toast/toast.actions';

import moment from 'moment';
import {
  GET_STATS_LOADING,
  GET_STATS_FAILED,
  GET_STATS_SUCCESS,
  UPLOAD_FILE_FAILED,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_LOADING,
  HIDE_UPLOAD_FILE_STATUS_MODAL,
  GET_DATA_DETAIL_SUCCESS,
  GET_DATA_DETAIL_LOADING,
  GET_DATA_DETAIL_FAILED,
  UPLOAD_FILE_S3_LOADING,
  GET_FILE_STATUS_FAILED,
  GET_FILE_STATUS_LOADING,
  GET_FILE_STATUS_SUCCESS,
} from 'constants/actionTypes';

export const getData = (year) => {
  function onSuccess(result) { return ({ type: GET_STATS_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_STATS_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_STATS_LOADING });

    return fetchData(year).then(
      (response) => dispatch(onSuccess(response)),
      (error) => {
        dispatch(onError(error));
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
  };
};

export const getDataDetail = (req) => {
  function onSuccess(result) { return ({ type: GET_DATA_DETAIL_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_DATA_DETAIL_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_DATA_DETAIL_LOADING });

    return fetchDataDetail(req).then(
      (response) => dispatch(onSuccess(response)),
      (error) => {
        dispatch(onError(error));
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
  };
};

export const getFileStatus = (req) => {
  function onSuccess(result) { return ({ type: GET_FILE_STATUS_SUCCESS, result }); }
  function onError(error) { return ({ type: GET_FILE_STATUS_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: GET_FILE_STATUS_LOADING });

    return fetchFileStatus({ config: { params: req.params } }).then(
      (response) => {
        const { processState } = response.data;
        if (!processState || !processState[0]) {
          return;
        }
        if (processState[0] === 300 || processState[0] === 400) {
          dispatch(onSuccess(response));
        }
      },
      (error) => {
        dispatch(onError(error));
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
  };
};


export const uploadFileToS3 = (config, file, dispatch) => {
  const { fields, url } = config.data.url;
  const formData = new FormData();
  formData.append('AWSAccessKeyId', fields.AWSAccessKeyId);
  formData.append('key', fields.key);
  formData.append('policy', fields.policy);
  formData.append('signature', fields.signature);
  formData.append('x-amz-security-token', fields['x-amz-security-token']);
  formData.append('file', file);
  const req = {
    payload: formData,
    url,
  };
  uploadLargeFile(req).then(() => {
    dispatch(hideToast());
  }).catch(() => { dispatch(hideToast()); });
  return ({ type: 'UPLOAD_FILE_TO_S3' });
};

export const uploadLargeDataFile = (req) => {
  const file = req.payload;
  return (dispatch) => getUploadFileAccess({ config: { params: { file: file.name } } })
    .then(
      (result) => {
        dispatch({ type: UPLOAD_FILE_S3_LOADING, result });
        dispatch(uploadFileToS3(result, file, dispatch));
        dispatch(showToast({ body: 'Un archivo se está subiendo y procesando', title: 'Procesando archivo' }));
      },
      (error) => {
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
};


export const uploadFileData = (req = {}) => {
  function onSuccess(result) { return ({ type: UPLOAD_FILE_SUCCESS, result }); }
  function onError(error) { return ({ type: UPLOAD_FILE_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: UPLOAD_FILE_LOADING, name: req.payload.name });
    req.config = {
      headers: { 'content-type': EXCEL_CONTENT_TYPE },
      onUploadProgress: req.onUploadProgress,
    };
    return uploadFile(req).then(
      (response) => {
        const now = moment();
        dispatch(getData(now.year()));
        dispatch(getDataDetail({ month: now.month() + 1, year: now.year() }));
        dispatch(onSuccess(response));
      },
      (error) => {
        dispatch(onError(error));
        dispatch(showAlert({ variant: 'error', data: error.response.data }));
      },
    );
  };
};

export const closeModal = () => ({ type: HIDE_UPLOAD_FILE_STATUS_MODAL });
