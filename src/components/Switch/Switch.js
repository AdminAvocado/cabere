import React from 'react';
import PropTypes from 'prop-types';
import './Switch.scss';

const Switch = (props) => {
  const { label, checked, onChange } = props;
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="Switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="Slider Round" />
    </label>
  );
};

Switch.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

Switch.defaultProps = {
  label: '',
  onChange: () => 1,
  checked: false,
};


export default Switch;
