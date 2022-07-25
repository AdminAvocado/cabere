import React from 'react';
import PropTypes from 'prop-types';
import './OptionGroup.scss';

const OptionGroup = (props) => {
  const {
    options,
    onChange,
    value,
    styleButton,
  } = props;
  return (
    <aside className="OptionGroup">
      {(options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`OptionGroup__option ${option.value === value ? styleButton.active : styleButton.inactive}`}
        >
          {option.label}
        </button>
      )))}
    </aside>
  );
};

OptionGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func,
  value: PropTypes.string,
  styleButton: PropTypes.shape({
    active: PropTypes.string,
    inactive: PropTypes.string,
  }),
};

OptionGroup.defaultProps = {
  options: [],
  value: '',
  onChange: () => 1,
  styleButton: { active: 'active', inactive: '' },
};

export default OptionGroup;
