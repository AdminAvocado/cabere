import React, { useState } from 'react';
import Card from 'components/Card';
import CardHeader from 'components/Card/CardHeader';
import Button from 'components/Button';
import Text from 'components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileData, uploadLargeDataFile } from 'containers/DataOwner/dataOwner.actions';
import ProgressBar from 'components/ProgressBar';
import FileSelector from 'components/FileSelector';
import './SideCard.scss';

const URL_TEMPLATE = 'files/template.xlsx';
const MAX_SIZE_IN_KB = 500000;
const loadingSelector = (state) => state.get('dataOwnerState').isLoadingFile;

export const UploadDownUsersCard = () => {
  const dispatch = useDispatch();
  const showProgress = useSelector(loadingSelector);
  const [progress, uploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [waitToStartProcess, setFlag] = useState(false);

  const onUploadProgress = (e) => {
    const p = Math.round(e.loaded / e.total) * 100;
    uploadProgress(p);
  };

  const handleUpload = () => {
    if (file.size <= MAX_SIZE_IN_KB) {
      dispatch(uploadFileData({ payload: file, onUploadProgress }));
      return;
    }
    dispatch(uploadLargeDataFile({ payload: file, large: true }));
    setFlag(true);
    setTimeout(() => setFlag(false), 4000);
  };

  return (
    <Card>
      <CardHeader icon="AiOutlineUserAdd">
        <Text component="h6" translationKey="data-owner.card-upload-up.title" />
        { showProgress ? <ProgressBar animated={progress === 100} striped variant="success" now={progress} /> : null}
      </CardHeader>
      <Button disabled={showProgress} variant="outline-secondary" href={URL_TEMPLATE} target="_blank">
        <Text translationKey="data-owner.card-upload-up.dformat-button" />
      </Button>
      <FileSelector disabled={showProgress} variant="outline-primary" onSelectFile={(f) => setFile(f)}>Cargar archivo</FileSelector>
      <span className="Card__info-d">
        {(file && file.size > MAX_SIZE_IN_KB) ? 'El archivo se procesará en segundo plano ' : ''}
      </span>
      <Button disabled={showProgress || !file || waitToStartProcess} onClick={handleUpload}>
        <Text translationKey="data-owner.card-upload-up.button" />
      </Button>
    </Card>
  );
};

export default UploadDownUsersCard;
