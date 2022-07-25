import React from 'react';
import UniqueQueryP from 'containers/UniqueQuery/UniqueQueryPage';
import DownloadFileC from 'containers/DataOwner/components/SideCard/DownloadFileCard';
import './DataAnalist.scss';

export const DataAnalistSideBar = () => (
  <div className="DataAnalistSideBar" style={{ width: '405px' }}>
    <div className="DataAnalistSideBar__content">
      <DownloadFileC />
      <UniqueQueryP />
    </div>
  </div>
);

export default DataAnalistSideBar;
