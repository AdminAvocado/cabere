/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import ModalRB from 'react-bootstrap/Modal';
import './Modal.scss';

const Modal = (props) => {
  const {
    size, onClose, title, variant, children, ...others
  } = props;
  return (
    <ModalRB
      {...others}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onClose}
      dialogClassName="Modal"
    >
      <ModalRB.Header closeButton>
        <ModalRB.Title>
          <h2 className={`Modal-variant ${variant}`}>{title}</h2>
        </ModalRB.Title>
      </ModalRB.Header>
      <ModalRB.Body>
        {children}
      </ModalRB.Body>
    </ModalRB>
  );
};

Modal.propTypes = {
  size: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
};

Modal.defaultProps = {
  size: 'md',
  variant: 'none',
  title: '',
  children: null,
  onClose: () => 1,
};

export default Modal;
