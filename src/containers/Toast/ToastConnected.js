import React from 'react';
import { Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toastSelector } from './toast.selector';


import './ToastConnected.scss';

const ToastConnected = () => {
  const { config, show } = useSelector(toastSelector);
  return (
    <aside className="ToastConnected" onClose={() => 1}>
      <Toast show={show}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">{config.title}</strong>
          <small>hace un momento</small>
        </Toast.Header>
        <Toast.Body>{config.body}</Toast.Body>
      </Toast>
    </aside>
  );
};

export default ToastConnected;
