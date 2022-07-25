import React from 'react';
import PropTypes from 'prop-types';

export const HomeSideBar = (props) => {
  const { error, isLoading, stats } = props;
  console.log(error, stats);
  return (
    isLoading ? (
      <div> isLoading...</div>
    ) : (
      <div className="HomeSideBar">
        HomeSideBar
      </div>
    )
  );
};


HomeSideBar.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape()),
  isLoading: PropTypes.bool,
  error: PropTypes.shape(),
};

HomeSideBar.defaultProps = {
  stats: [],
  isLoading: false,
  error: null,
};

export default HomeSideBar;
