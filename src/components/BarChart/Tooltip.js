import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from 'utils/format';
import './BarChart.scss';

const CustomTooltip = (props) => {
  const {
    active, payload = [{}], label, color, labelSufix,
  } = props;
  if (active) {
    return (
      <div className="Custom-tooltip">
        <span className="label">{label}</span>
        <div className="content">
          <span className="point" style={{ backgroundColor: color }} />
          <span className="value">
            { payload ? `${formatNumber(payload[0].value)} ${labelSufix}` : null}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  label: PropTypes.string,
  color: PropTypes.string,
  labelSufix: PropTypes.string,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
  color: 'green',
  labelSufix: '',
};

export default CustomTooltip;
