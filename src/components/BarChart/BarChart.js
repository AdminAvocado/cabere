import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import CustomTooltip from './Tooltip';
import './BarChart.scss';

const xLabelStyle = {
  fontFamily: 'CircularStd',
  fontSize: '0.6875rem',
  fontWeight: 500,
  fill: '#abafc8',
};

const yLabelStyles = {
  fontFamily: 'CircularStd',
  fontSize: '0.6875rem',
  fontWeight: 500,
  fill: '#abafc8',
};

const BarChar = (props) => {
  const {
    data, datakey, dataname, color, minHeight, clickBar, activeIndex, labelSufix,
  } = props;
  return (
    <ResponsiveContainer minHeight={minHeight}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        barSize={7}
        onClick={clickBar}
      >
        <XAxis dataKey={dataname} scale="point" tick={xLabelStyle} sypadding={{ left: 10, right: 10 }} />
        <YAxis tick={yLabelStyles} />
        <Tooltip content={<CustomTooltip color={color} labelSufix={labelSufix} />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey={datakey} background={{ fill: 'transparent' }}>
          {
            data.map((entry, index) => (
              <Cell cursor="pointer" key={`w-${index + 1}`} fill={index === activeIndex ? '#18BAD1' : color} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

BarChar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  datakey: PropTypes.string.isRequired,
  dataname: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  clickBar: PropTypes.func,
  labelSufix: PropTypes.string,
  activeIndex: PropTypes.number,
};

BarChar.defaultProps = {
  data: [],
  minHeight: 300,
  clickBar: (a) => a,
  activeIndex: -1,
  labelSufix: '',
};
export default BarChar;
