import cabereApi from './cabereApi.config';

export const getStats = (year) => cabereApi.get(`/historicaldata?year=${year}`);

export const getStatById = () => {};

export const monthDetailData = (month, year, type) => cabereApi.get(`/dashboard?month=${month}&year=${year}&type=${type}`);
