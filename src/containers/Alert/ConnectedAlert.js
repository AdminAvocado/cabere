import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'components/Toast';
import { alertSelector } from './alert.selector';
import { hideAlert } from './alert.actions';

const ConnectedToast = () => {
  const dispatch = useDispatch();
  const { alert, show } = useSelector(alertSelector);
  return (
    <Alert
      show={show}
      data={alert}
      variant={alert.variant}
      onClose={() => dispatch(hideAlert())}
      delay={3000}
    />
  );
};

export default ConnectedToast;
