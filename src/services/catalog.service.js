import cabereApi from './cabereApi.config';

export const getCoverageCatalog = () => cabereApi.get('/catalog/coverage');

export const getYears = () => new Promise((resolve) => {
  const years = [];
  const y = new Date().getFullYear();
  for (let initial = 2019; initial <= y; initial += 1) {
    years.push({ label: initial.toString(), value: initial.toString() });
  }
  resolve(years);
});

export const getMonths = () => new Promise((resolve) => {
  const months = [
    { label: 'Enero', value: '1' },
    { label: 'Febrero', value: '2' },
    { label: 'Marzo', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Mayo', value: '5' },
    { label: 'Junio', value: '6' },
    { label: 'Julio', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Septiembre', value: '9' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];
  resolve(months);
});
