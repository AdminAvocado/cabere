import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from 'utils/format';
import './DataDetail.scss';

const DataDetailContainer = (props) => {
  const { amount, label } = props;
  return (
    <article className="DataDetailCard">
      <span className="DataDetailCard__label">
        {label}
      </span>
      <span className="DataDetailCard__amount">
        {formatNumber(amount)}
      </span>
    </article>
  );
};

DataDetailContainer.propTypes = {
  amount: PropTypes.number,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
};

DataDetailContainer.defaultProps = {
  amount: 0,
  label: '',
};

export default DataDetailContainer;
