import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './HeaderCard.scss';

const HeaderCard = (props) => {
  const { date } = props;
  return (
    <aside className="HeaderCard">
      <span>
        Fecha de ultima actualización:
        {date}
      </span>
    </aside>
  );
};

HeaderCard.propTypes = {
  date: PropTypes.string,
};

HeaderCard.defaultProps = {
  date: moment().format('L'),
};

export default HeaderCard;
