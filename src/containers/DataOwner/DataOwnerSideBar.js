import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UniqueQueryP from 'containers/UniqueQuery/UniqueQueryPage';
import DownloadFileC from './components/SideCard/DownloadFileCard';
import UploadDownUsersC from './components/SideCard/UploadDownUsersCard';
import UploadUpUsersCard from './components/SideCard/UploadUpUsersCard';
import StatusModal from './components/Modals/Modal';
import { closeModal } from './dataOwner.actions';
import './DataOwner.scss';

const uploadStatusSelector = (state) => state.get('dataOwnerState').uploadFileStaus;
const name = (state) => state.get('dataOwnerState').filename;

export const DataOwnerSideBar = () => {
  const dispatch = useDispatch();
  const uploadStatus = useSelector(uploadStatusSelector);
  const f = useSelector(name);
  return (
    <div style={{ width: '405px' }}>
      <DownloadFileC showProgress />
      <UploadUpUsersCard showProgress />
      <UploadDownUsersC showProgress />
      <UniqueQueryP className="DataOwnerSideBar__unique-query" />
      <StatusModal
        show={Boolean(uploadStatus)}
        uploadStatus={uploadStatus}
        onClose={() => dispatch(closeModal())}
        filename={f}
      />
    </div>
  );
};

export default DataOwnerSideBar;
