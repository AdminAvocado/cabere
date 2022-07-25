import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Card from 'components/Card';
import PropTypes from 'prop-types';
import CardHeader from 'components/Card/CardHeader';
import Select from 'components/Select';
import Button from 'components/Button';
import Text from 'components/Text';
import ProgressBar from 'components/ProgressBar';
import DatePicker from 'components/DatePicker';
import moment from 'moment';
import { getCoverageCatalog, getDownloadfile } from './downloadFile.actions';

import './SideCard.scss';

export const DownloadFileCard = (props) => {
  const {
    data, isLoading, getCatalog, isDownloading, errorDownloading,
  } = props;

  const dispatch = useDispatch();
  const [progress, uploadProgress] = useState(0);
  const [showProgess, uploadProgressVisibility] = useState(false);

  const [plan, setPlan] = React.useState('');
  const [planLabel, setPlanLabel] = React.useState('Selecciona un plan');
  const [initialDate, changeInitDate] = React.useState(new Date());
  const [endDate, changeEndDate] = React.useState(new Date());

  const onDownloadProgress = (e) => {
    const p = Math.round(e.loaded / e.total) * 100;
    uploadProgress(p);
  };
  useEffect(() => {
    if (!isDownloading && showProgess) {
      setTimeout(() => uploadProgressVisibility(false), 1000);
    }
  }, [isDownloading, showProgess]);
  useEffect(() => {
    getCatalog();
  }, [getCatalog]);

  return (
    <Card className="DownloadFileCard">
      <CardHeader icon="AiOutlineDownload">
        <Text component="h6" translationKey="data-owner.card-download.title" />
        {showProgess ? <ProgressBar variant="success" now={progress} /> : null}
      </CardHeader>
      <div className="DownloadFileCard__date-select">
        <div className="DownloadFileCard__date-select__dp">
          <span className="DownloadFileCard__date-select__init-date">
            <Text translationKey="data-owner.card-download.init-date-label" />
          </span>
          <DatePicker
            selected={initialDate}
            onChange={(date) => changeInitDate(date)}
          />
        </div>
        <div className="DownloadFileCard__date-select__dp">
          <span className="DownloadFileCard__date-select__end-date">
            <Text translationKey="data-owner.card-download.end-date-label" />
          </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => changeEndDate(date)}
            error={endDate < initialDate}
          />
          <span className="DownloadFileCard__date-select__error-end-date">
            {endDate < initialDate ? <Text translationKey="data-owner.card-download.end-date-error" /> : null }
          </span>
        </div>
      </div>
      <Select
        options={data}
        placeholder="Plan"
        onChange={(i, e) => {
          setPlan(e.target.attributes[0].value);
          setPlanLabel(e.target.text === undefined ? plan : e.target.text);
        }}
        value={isLoading ? 'Loading...' : planLabel}
      />
      <Button
        variant="info"
        disabled={endDate < initialDate}
        onClick={() => {
          let queryParams = `initialDate=${moment(initialDate).format('YYYY-MM-DD')}&finalDate=${moment(endDate).format('YYYY-MM-DD')}`;
          queryParams += (planLabel !== 'Selecciona un plan' ? `&plan=${plan}` : '');
          uploadProgress(0);
          dispatch(getDownloadfile({ queryParams, config: { onDownloadProgress } }));
          uploadProgressVisibility(true);
        }}
      >
        <Text translationKey="data-owner.card-download.button" />
      </Button>
      { (errorDownloading)
        ? <span className="DownloadFileCard__not-found-error">{errorDownloading.message}</span> : null}
    </Card>
  );
};

DownloadFileCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  isLoading: PropTypes.bool,
  getCatalog: PropTypes.func,
  errorDownloading: PropTypes.shape({
    message: PropTypes.string,
  }),
  isDownloading: PropTypes.bool,
};

DownloadFileCard.defaultProps = {
  data: [],
  isLoading: false,
  isDownloading: false,
  errorDownloading: null,
  getCatalog: (a) => a,

};

const mapStateToProps = (state) => ({
  data: state.get('downloadFileState').data,
  isLoading: state.get('downloadFileState').isLoading,
  error: state.get('downloadFileState').error,
  isDownloading: state.get('downloadFileState').isDownloading,
  errorDownloading: state.get('downloadFileState').errorDownloading,
});

const mapDispatchToProps = (dispatch) => ({
  getCatalog: () => dispatch(getCoverageCatalog()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownloadFileCard);
