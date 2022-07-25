import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './SpinnerPage.scss';

const SpinnerPage = () => (
  <div className="SpinnerPage">
    <div className="SpinnerPage__col">
      <div className="SpinnerPage_row">
        <Spinner className="SpinnerPage__spiner" animation="grow" variant="primary" size={50} />
      </div>
    </div>
  </div>
);

export default SpinnerPage;
