import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import Table from 'components/Table';
import Switch from 'components/Switch';
import BarChart from 'components/BarChart';
import OptionGroup from 'components/OptionGroup';
import HeaderCard from 'components/HeaderCard';
import { formatNumber } from 'utils/format';
import moment from 'moment';
import { getDetailMonthData as fetchMonthDetail } from 'containers/DataAnalist/dataAnalist.actions';
import { getData as fetchData } from './dataOwner.actions';
import DataDetail from './components/InfoCard/DataDetailContainer';
import './DataOwner.scss';

let updateInterval = null;
const tableHeaders = [{ label: 'Colectivo', key: 'planName' }, { label: 'TIPO_ALTA', key: 'plan' }, { label: 'Total', key: 'activeUsers', f: formatNumber }];
const INTERVAL_TO_REFRESH = 120000;
const DETAIL_OPTIONS = [{ label: 'Por Coberturas', value: 'coverage' }, { label: 'Por Altas', value: 'registered' }, { label: 'Por Bajas', value: 'unsuscribed' }];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const CLASS_CSS_G2 = { active: 'btn btn-outline-warning', inactive: 'btn btn-outline-secondary' };

export const DataOwnerPage = (props) => {
  const {
    data, getData, getMonthDetail, monthDetail,
  } = props;

  const [isTableVisible, changeTableVisibility] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [type, changeType] = useState('coverage');
  const [lastUpdateTime, updateTime] = useState(moment());


  useEffect(() => {
    const year = new Date().getFullYear();
    getData(year.toString());
    return () => {
      clearInterval(updateInterval);
    };
  }, [getData]);

  useEffect(() => {
    const year = new Date().getFullYear();
    getMonthDetail((month + 1).toString(), year.toString(), type);
  }, [getMonthDetail, month, type]);

  useEffect(() => {
    updateInterval = setInterval(() => {
      updateTime(moment());
      const date = new Date();
      const year = date.getFullYear();
      getData(year.toString());
      getMonthDetail((date.getMonth() + 1).toString(), year.toString(), 'coverage');
    }, INTERVAL_TO_REFRESH);
  }, [getData, getMonthDetail]);

  const total = monthDetail.reduce((sum, elem) => sum + elem.activeUsers, 0);
  const tableFooterCols = [{ value: 'Total' }, { value: '' }, { value: total, f: formatNumber }];

  return (
    <div className="DataOwnerPage">
      <section className="DataOwnerPage__chart">
        <HeaderCard date={lastUpdateTime.format('LT')} />
        <div className="DataOwnerPage__chart__header">
          <h6><Text translationKey="data-owner.chart-title" /></h6>
        </div>
        <BarChart
          labelSufix="Clientes"
          data={data}
          color="#504da6"
          datakey="activeUsers"
          dataname="month"
          clickBar={(e) => {
            if (e != null) {
              const l = e != null ? e.activeLabel : '';
              const i = MONTH_NAMES.indexOf(l);
              setMonth(i);
            }
          }}
        />
      </section>
      <section className="DataOwnerPage__data">
        <div className="DataOwnerPage__data__header">
          <h6><Text translationKey="data-owner.info-card-title" /></h6>
        </div>
        <DataDetail />
      </section>
      <section className="DataOwnerPage__chart-detail">
        <div className="DataOwnerPage__chart__header">
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
        <div className="DataOwnerPage__switch__section">
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


DataOwnerPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  monthDetail: PropTypes.arrayOf(PropTypes.shape()),
  getMonthDetail: PropTypes.func,
  getData: PropTypes.func,
};

DataOwnerPage.defaultProps = {
  data: [],
  monthDetail: [],
  getData: (a) => a,
  getMonthDetail: (a) => a,
};


const mapStateToProps = (state) => ({
  data: state.get('dataOwnerState').data,
  isLoading: state.get('dataOwnerState').isLoading,
  error: state.get('dataOwnerState').error,
  monthDetail: state.get('dataAnalistState').monthDetail,

});

const mapDispatchToProps = (dispatch) => ({
  getData: (req) => dispatch(fetchData(req)),
  getMonthDetail: (m, y, t) => dispatch(fetchMonthDetail(m, y, t)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataOwnerPage);
