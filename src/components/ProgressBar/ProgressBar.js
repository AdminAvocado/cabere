import React from 'react';
import PropTypes from 'prop-types';
import ProgressBarB from 'react-bootstrap/ProgressBar';
import './ProgressBar.scss';

const ProgressBar = (props) => {
  const {
    now, variant, striped, animated,
  } = props;
  return (<ProgressBarB className="ProgressBar" striped={striped} animated={animated} variant={variant} now={now} />
  );
};

ProgressBar.propTypes = {
  variant: PropTypes.string,
  now: PropTypes.number.isRequired,
  striped: PropTypes.bool,
  animated: PropTypes.bool,
};

ProgressBar.defaultProps = {
  variant: 'success',
  striped: false,
  animated: false,
};


export default ProgressBar;
