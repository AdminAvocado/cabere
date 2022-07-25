import {
  combineReducers,
} from 'redux-immutable';
import dataOwnerState from './containers/DataOwner/dataOwner.reducer';
import alertState from './containers/Alert/alert.reducer';
import toastState from './containers/Toast/toast.reducer';
import dataAnalistState from './containers/DataAnalist/dataAnalist.reducer';
import businessOwnerState from './containers/BusinessOwner/businessOwner.reducer';
import uniqueQueryState from './containers/UniqueQuery/uniqueQuery.reducer';
import fileStatusState from './containers/FileStatus/fileStatus.reducer';
import downloadFileState from './containers/DataOwner/components/SideCard/downloadFile.reducer';


export default combineReducers({
  alertState,
  toastState,
  downloadFileState,
  dataAnalistState,
  dataOwnerState,
  uniqueQueryState,
  businessOwnerState,
  fileStatusState,
});
