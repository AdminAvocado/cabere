import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import BarChart from 'components/BarChart';
import HeaderCard from 'components/HeaderCard';
import OptionGroup from 'components/OptionGroup';
import { getStats as getData, getDetailMonthData as fetchMonthDetail } from './businessOwner.actions';
import './BusinessOwner.scss';

const DETAIL_OPTIONS = [{ label: 'Por Coberturas', value: 'coverage' }, { label: 'Por Altas', value: 'registered' }, { label: 'Por Bajas', value: 'unsuscribed' }];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const CLASS_CSS_G2 = { active: 'btn btn-outline-warning', inactive: 'btn btn-outline-secondary' };

export const BusinessOwnerPage = (props) => {
  const {
    data, getStats, monthDetail, getMonthDetail,
  } = props;
  const [type, changeType] = useState('coverage');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [activeIndex, setActiveIndex] = useState(new Date().getMonth());
  useEffect(() => {
    const year = new Date().getFullYear();
    getStats(year);
  }, [getStats]);

  useEffect(() => {
    const year = new Date().getFullYear();
    getMonthDetail((month + 1).toString(), year.toString(), type);
  }, [getMonthDetail, month, type]);

  return (
    <div className="BusinessOwnerPage">
      <section className="BusinessOwnerPage__chart">
        <HeaderCard />
        <div className="BusinessOwnerPage__chart__header">
          <h6><Text translationKey="data-analyst.chart-title" /></h6>
        </div>
        <BarChart
          data={data}
          color="#504da6"
          datakey="activeUsers"
          dataname="month"
          labelSufix="Clientes"
          activeIndex={activeIndex}
          clickBar={(e) => {
            if (e != null) {
              const m = e != null ? e.activeTooltipIndex : (new Date().getMonth());
              setActiveIndex(e.activeTooltipIndex);
              setMonth(m);
            }
          }}
        />
        <hr />
        <div className="BusinessOwnerPage__chart__header">
          <h6>
            <Text translationKey="data-analyst.chart-detail-title" />
            {` - ${MONTH_NAMES[month]}`}
          </h6>
          <OptionGroup
            options={DETAIL_OPTIONS}
            onChange={(d) => changeType(d)}
            value={type}
            styleButton={CLASS_CSS_G2}
          />
        </div>
        <BarChart
          data={monthDetail}
          color="#FD6F1B"
          labelSufix="Clientes"
          datakey="activeUsers"
          dataname="plan"
        />
      </section>
    </div>
  );
};


BusinessOwnerPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  getStats: PropTypes.func,
  monthDetail: PropTypes.arrayOf(PropTypes.shape()),
  getMonthDetail: PropTypes.func,
};

BusinessOwnerPage.defaultProps = {
  data: [],
  getStats: (a) => a,
  monthDetail: [],
  getMonthDetail: (a) => a,
};


const mapStateToProps = (state) => ({
  isLoading: state.get('businessOwnerState').isLoading,
  error: state.get('businessOwnerState').error,
  data: state.get('businessOwnerState').data,
  monthDetail: state.get('businessOwnerState').monthDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getStats: (req) => dispatch(getData(req)),
  getMonthDetail: (m, y, t) => dispatch(fetchMonthDetail(m, y, t)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessOwnerPage);
