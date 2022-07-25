import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import './Toast.scss';

const Toast = (props) => {
  const {
    variant, show, onClose, data,
  } = props;
  const type = variant === 'error' ? 'danger' : variant;
  return (
    <Alert show={show} className="Toast" variant={type} onClose={onClose} dismissible>
      <span>
        {data.data && data.data.message}
      </span>
    </Alert>
  );
};

Toast.propTypes = {
  variant: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.shape({
    data: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};


Toast.defaultProps = {
  variant: 'success',
  show: true,
  data: {},
  onClose: () => 1,
};

export default Toast;
