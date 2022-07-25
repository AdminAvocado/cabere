import React from 'react';
import UniqueQueryP from 'containers/UniqueQuery/UniqueQueryPage';
import DownloadFileC from 'containers/DataOwner/components/SideCard/DownloadFileCard';
import './BusinessOwner.scss';

export const BusinessOwnerSideBar = () => (
  <div className="BusinessOwnerSideBar" style={{ width: '405px' }}>
    <div className="BusinessOwnerSideBar__content">
      <DownloadFileC />
      <UniqueQueryP />
    </div>
  </div>
);

export default BusinessOwnerSideBar;
