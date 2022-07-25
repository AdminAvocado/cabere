import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import BarChart from 'components/BarChart';
import HeaderCard from 'components/HeaderCard';
import OptionGroup from 'components/OptionGroup';
import Switch from 'components/Switch';
import Table from 'components/Table';
import { formatNumber } from 'utils/format';
import { getStats as getData, getDetailMonthData as fetchMonthDetail } from './dataAnalist.actions';
import './DataAnalist.scss';

const DETAIL_OPTIONS = [{ label: 'Por Coberturas', value: 'coverage' }, { label: 'Por Altas', value: 'registered' }, { label: 'Por Bajas', value: 'unsuscribed' }];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const CLASS_CSS_G2 = { active: 'btn btn-outline-warning', inactive: 'btn btn-outline-secondary' };

const tableHeaders = [{ label: 'Colectivo', key: 'planName' }, { label: 'TIPO_ALTA', key: 'plan' }, { label: 'Total', key: 'activeUsers', f: formatNumber }];

export const DataAnalistPage = (props) => {
  const {
    data, getStats, monthDetail, getMonthDetail,
  } = props;
  const [type, changeType] = useState('coverage');
  const [isTableVisible, changeTableVisibility] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [activeIndex, setActiveIndex] = useState(new Date().getMonth());

  useEffect(() => {
    const year = new Date().getFullYear();
    getStats(year);
  }, [getStats]);

  useEffect(() => {
    const year = new Date().getFullYear();
    getMonthDetail((month + 1).toString(), year.toString(), type);
  }, [getMonthDetail, month, type]);

  const total = monthDetail.reduce((sum, elem) => sum + elem.activeUsers, 0);
  const tableFooterCols = [{ value: 'Total' }, { value: '' }, { value: total, f: formatNumber }];
  return (
    <div className="DataAnalystPage">
      <section className="DataAnalystPage__chart">
        <HeaderCard />
        <div className="DataAnalystPage__chart__header">
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
              const l = e != null ? e.activeLabel : '';
              const i = MONTH_NAMES.indexOf(l);
              setActiveIndex(i);
              setMonth(i);
            }
          }}
        />
        <hr />
        <div className="DataAnalystPage__chart__header">
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
        <div className="DataAnalystPage__switch__section">
          <Text translationKey="data-analyst.show-table-label" component="span" className="lb" />
          <Switch
            checked={isTableVisible}
            onChange={() => changeTableVisibility(!isTableVisible)}
          />
        </div>
        { isTableVisible ? (
          <Table data={monthDetail} headers={tableHeaders} footerCols={tableFooterCols} />) : (
            <BarChart
              data={monthDetail}
              color="#FD6F1B"
              labelSufix="Clientes"
              datakey="activeUsers"
              dataname="plan"
            />
        )}
      </section>
    </div>
  );
};


DataAnalistPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  getStats: PropTypes.func,
  monthDetail: PropTypes.arrayOf(PropTypes.shape()),
  getMonthDetail: PropTypes.func,
};

DataAnalistPage.defaultProps = {
  data: [],
  getStats: (a) => a,
  monthDetail: [],
  getMonthDetail: (a) => a,
};


const mapStateToProps = (state) => ({
  isLoading: state.get('dataAnalistState').isLoading,
  error: state.get('dataAnalistState').error,
  data: state.get('dataAnalistState').data,
  monthDetail: state.get('dataAnalistState').monthDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getStats: (req) => dispatch(getData(req)),
  getMonthDetail: (m, y, t) => dispatch(fetchMonthDetail(m, y, t)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataAnalistPage);
