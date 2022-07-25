import cabereApi from './cabereApi.config';

export const getData = (year) => cabereApi.get(`/historicaldata?year=${year}`);

export const fetchDataDetail = ({ year, month }) => cabereApi.get(`/historicaldata/detail?year=${year}&month=${month}`);
