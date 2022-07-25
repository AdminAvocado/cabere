import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import './DatePicker.scss';

const DatePicker = (props) => {
  const { error, ...others } = props;
  return (
    <ReactDatePicker
      className={`DatePicker ${error ? 'error' : ''}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...others}
    />
  );
};

DatePicker.propTypes = {
  error: PropTypes.bool,
};

DatePicker.defaultProps = {
  error: false,
};

export default DatePicker;
