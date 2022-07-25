import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Select.scss';

const Options = (props) => {
  const { options } = props;
  if (!options) return null;
  return (
    options.map((option, index) => (
      <Dropdown.Item value={option.value} key={option.value} eventKey={index}>
        {option.label}
      </Dropdown.Item>
    ))
  );
};

const Select = (props) => {
  const {
    value, onChange, options, placeholder,
  } = props;
  return (
    <DropdownButton
      as={ButtonGroup}
      className="Select"
      title={!value ? placeholder : value}
      variant=""
      onSelect={onChange}
    >
      <Dropdown.Item value={-1} key={placeholder} eventKey={-1}>
        {placeholder}
      </Dropdown.Item>
      <Options options={options} />
    </DropdownButton>
  );
};

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  options: [],
  onChange: (a) => a,
  placeholder: '',
};
export default Select;
