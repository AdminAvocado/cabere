import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
  const {
    value, onChange, decorator, placeholder, error,
  } = props;
  return (
    <div className={`Input ${error ? 'error' : ''}`}>
      <input
        className="Input__input inputText"
        value={value}
        onChange={onChange}
        required
      />
      <span className="Input__floating-label floating-label">{placeholder}</span>
      { decorator && (
        <div className="Input__decorator">
          <img src={decorator} alt="icon_decorator" />
        </div>
      )}

    </div>
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
  decorator: PropTypes.string,
  error: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  decorator: null,
  error: false,
};

export default Input;
