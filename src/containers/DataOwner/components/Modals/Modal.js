import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { downloadB64File } from 'utils/download';
import { getDateFormated } from 'utils/time';

const DOModal = (props) => {
  const {
    show,
    onClose,
    uploadStatus,
    filename,
  } = props;
  const des = uploadStatus || {};
  if (des.with_error > 0) {
    return (
      <Modal show={show} title="Archivo cargado" variant="danger" onClose={onClose}>
        <div className="DataOwnerSideBar__modal">
          <p>
            Encontramos
            {` ${des.with_error} `}
            casos de error, revisa la información del archivo y vuelve a cargarlo.
          </p>
          <div className="DataOwnerSideBar__info">
            <button
              type="button"
              className="DataOwnerSideBar__info__button"
              onClick={() => downloadB64File(des.file, `Reporte-error-${getDateFormated()}.xlsx`)}
            >
              <span style={{ color: 'black' }}>
                Descargar archivo con informe de error
              </span>
            </button>
            <div className="DataOwnerSideBar__info__file-name">{`Archivo con errores: ${filename}`}</div>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal show={show} title="Archivo cargado" variant="danger" onClose={onClose}>
      <div className="DataOwnerSideBar__modal">
        <p>{`Archivo ${filename} cargado correctamente`}</p>
      </div>
    </Modal>
  );
};

DOModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  uploadStatus: PropTypes.shape({
    with_error: PropTypes.number,
    file: PropTypes.string,
  }),
  filename: PropTypes.string,
};

DOModal.defaultProps = {
  uploadStatus: {},
  filename: '',
};

export default DOModal;
