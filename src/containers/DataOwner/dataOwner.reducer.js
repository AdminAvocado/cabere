// import { downloadFile } from 'utils/download';
import {
  GET_STATS_LOADING,
  GET_STATS_FAILED,
  GET_STATS_SUCCESS,
  UPLOAD_FILE_FAILED,
  UPLOAD_FILE_LOADING,
  HIDE_UPLOAD_FILE_STATUS_MODAL,
  UPLOAD_FILE_SUCCESS,
  GET_DATA_DETAIL_SUCCESS,
  GET_DATA_DETAIL_LOADING,
  GET_DATA_DETAIL_FAILED,
  UPLOAD_FILE_S3_LOADING,
} from 'constants/actionTypes';


const initialState = {
  isLoading: false,
  data: [],
  dataDetail: {},
  error: null,
  uploadFileStaus: null,
  isLoadingFile: false,
  filename: '',
  fileProcessInfo: null,
  errorUploadingFile: null,
  isLoadingMonthDetail: false,
  lastUpdate: null,
};


const dataOwnerReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_STATS_LOADING:
      return { ...state, isLoading: true };
    case GET_STATS_SUCCESS: {
      const { HistoricalData } = action.result.data;
      return { ...state, isLoading: false, data: HistoricalData };
    }
    case UPLOAD_FILE_S3_LOADING:
      return { ...state, fileProcessInfo: action.result.data };

    case GET_STATS_FAILED:
      return { ...state, isLoading: false, error: action.error.response.data };

    case UPLOAD_FILE_LOADING:
      return {
        ...state,
        isLoadingFile: true,
        filename: action.name,
        errorUploadingFile: null,
      };
    case UPLOAD_FILE_FAILED:
      return { ...state, isLoadingFile: false, errorUploadingFile: action.error.response.data };

    case UPLOAD_FILE_SUCCESS: {
      const { data } = action.result;
      return { ...state, isLoadingFile: false, uploadFileStaus: data };
    }
    case GET_DATA_DETAIL_SUCCESS: {
      const data = action.result.data.HistoricalDataDetail || [];
      return { ...state, isLoadingDetail: true, dataDetail: data[0] };
    }
    case GET_DATA_DETAIL_LOADING:
      return { ...state, isLoadingDetail: false, dataDetailError: null };
    case GET_DATA_DETAIL_FAILED:
      return { ...state, isLoadingDetail: false, dataDetailError: action.error.response.data };
    case HIDE_UPLOAD_FILE_STATUS_MODAL:
      return { ...state, isLoading: false, uploadFileStaus: null };
    default:
      return state;
  }
};

export default dataOwnerReducer;
