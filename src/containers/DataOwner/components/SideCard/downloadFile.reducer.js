import { downloadFile, b64toBlob } from 'utils/download';
import { EXCEL_CONTENT_TYPE } from 'constants/files';
import {
  GET_COVERAGE_CAT_LOADING,
  GET_COVERGAE_CAT_SUCCESS,
  GET_COVERAGE_CAT_FAILED,
  GET_DOWNLOAD_FILE_LOADING,
  GET_DOWNLOAD_FILE_SUCCESS,
  GET_DOWNLOAD_FILE_FAILED,
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  data: [],
  error: null,
  isDownloading: false,
  fileDownloaded: null,
  errorDownloading: null,
};


const downloadFileReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_COVERAGE_CAT_LOADING:
      return { ...state, isLoading: true };
    case GET_COVERGAE_CAT_SUCCESS: {
      const { coverage } = action.result.data;
      const items = [];
      coverage.forEach((x) => {
        items.push({ value: x.plan, label: `${x.plan} - ${x.coverage}` });
      });
      return { ...state, isLoading: false, data: items };
    }
    case GET_COVERAGE_CAT_FAILED:
      return { ...state, isLoading: false, error: action.error.response.data };
    case GET_DOWNLOAD_FILE_LOADING:
      return {
        ...state, isDownloading: true, fileDownloaded: false, errorDownloading: null,
      };
    case GET_DOWNLOAD_FILE_SUCCESS: {
      const { file } = action.result.data;
      if (!file) {
        return {
          ...state,
          isDownloading: false,
          fileDownloaded: false,
          errorDownloading: { message: 'Reporte no encontrado' },
        };
      }
      downloadFile(b64toBlob(file), 'Reporte.xlsx', EXCEL_CONTENT_TYPE);
      return {
        ...state, isDownloading: false, fileDownloaded: true, errorDownloading: null,
      };
    }
    case GET_DOWNLOAD_FILE_FAILED:
      return {
        ...state,
        isDownloading: false,
        fileDownloaded: false,
        errorDownloading: action.error.response.data,
      };
    default:
      return state;
  }
};

export default downloadFileReducer;
