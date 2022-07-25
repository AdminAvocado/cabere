import React from 'react';
import PropTypes from 'prop-types';
import TableRB from 'react-bootstrap/Table';
import './Table.scss';

const printHeaders = (headers) => {
  if (!headers) return null;
  return headers.map((h) => <th key={h.label}>{h.label}</th>);
};

const printFooterCols = (cols) => {
  if (!cols) return null;
  return cols.map((h) => <th key={h.value}>{h.f ? h.f(h.value) : h.value}</th>);
};

const printRows = (rows, headers) => {
  if (!rows) return null;
  return rows.map((row, i) => (
    <tr key={`${i + 1}`}>
      {headers.map((h) => <th key={h.key}>{h.f ? h.f(row[h.key]) : row[h.key]}</th>)}
    </tr>
  ));
};


const Table = (props) => {
  const { headers, data, footerCols } = props;
  return (
    <TableRB responsive>
      <thead className="Table__head">
        <tr>
          {printHeaders(headers)}
        </tr>
      </thead>
      <tbody className="Table__body">
        {printRows(data, headers)}
      </tbody>
      <tfoot className="Table__foot">
        <tr>
          {printFooterCols(footerCols)}
        </tr>
      </tfoot>
    </TableRB>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  headers: PropTypes.arrayOf(PropTypes.shape({})),
  footerCols: PropTypes.arrayOf(PropTypes.shape({})),
};

Table.defaultProps = {
  data: [],
  headers: [],
  footerCols: [],
};

export default Table;
