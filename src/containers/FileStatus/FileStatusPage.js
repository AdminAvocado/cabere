import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import HeaderCard from 'components/HeaderCard';
import Button from 'components/Button';
import Table from 'components/Table';
import { FiDownload } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { downloadB64File } from 'utils/download';

import { getFileStatus } from './fileStatus.actions';
import { fileStatusSelector } from './fileStatus.selectors';
import './FileStatus.scss';

const statusToName = (statusCode) => {
  switch (statusCode) {
    case 0: return 'Solicitud';
    case 100: return 'Recibido';
    case 200: return 'En proceso';
    case 201: return 'En validacion';
    case 202: return 'Validado';
    case 203: return 'Dividiendo Info';
    case 204: return 'Dividido';
    case 205: return 'Insertando....';
    case 300: return 'Terminado OK';
    case 400: return 'Con errores';
    default:
      return 'Otro';
  }
};

const downloadReportButton = (file) => {
  const abled = Boolean(file && file !== '');
  return (
    <button
      type="button"
      className={`FileStatusPage__download-button ${abled ? 'active' : ''}`}
      disabled={!abled}
      onClick={() => downloadB64File(file, 'ReporteErrores.xlsx')}
    >
      <FiDownload size={25} />
    </button>
  );
};

const tableHeaders = [
  { label: 'Fecha', key: 'creationDate' },
  { label: 'Nombre del archivo', key: 'filename' },
  { label: 'Errores con validación', key: 'recordserrorvalidation' },
  { label: 'Registros totales', key: 'totalrecords' },
  { label: 'Estatus', key: 'state', f: statusToName },
  { label: 'Reporte', key: 'errorsFile', f: downloadReportButton }];

export const FileStatusPage = ({ className, aditionalProps }) => {
  const dispatch = useDispatch();
  const [lastUpdateTime, updateTime] = useState(moment());
  const [resized, updateResizedStatus] = useState(false);

  const { user, fileStatuses } = useSelector(fileStatusSelector);

  useEffect(() => {
    const { trigger } = aditionalProps;
    if (!resized) {
      updateResizedStatus(true);
      trigger();
    }
  }, [aditionalProps, resized, updateResizedStatus]);

  useEffect(() => {
    if (user && user.username) {
      dispatch(getFileStatus({ config: { params: { user: user.username } } }));
    }
  }, [user, dispatch]);


  const refreshData = () => {
    dispatch(getFileStatus({ config: { params: { user: user.username } } }));
    updateTime(moment());
  };

  return (
    <div className={`FileStatusPage ${className}`}>
      <div className="FileStatusPage__container">
        <aside className="FileStatusPage__container__reload-section">
          <HeaderCard date={lastUpdateTime.format('LT')} />
          <Button onClick={refreshData}>Actualizar </Button>
        </aside>
        <section>
          <Table data={fileStatuses} headers={tableHeaders} />
        </section>
      </div>
    </div>
  );
};

FileStatusPage.propTypes = {
  className: PropTypes.string,
  trigger: PropTypes.func,
  aditionalProps: PropTypes.shape({
    trigger: PropTypes.func,
  }),
};

FileStatusPage.defaultProps = {
  className: '',
  trigger: () => 1,
  aditionalProps: {},
};


export default FileStatusPage;
