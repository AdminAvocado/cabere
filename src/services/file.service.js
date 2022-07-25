import axios from 'axios';
import cabereApi from './cabereApi.config';


export const getDownloadFile = (req) => cabereApi.get(`/file?${req.queryParams}`, req.config);

export const uploadFile = (req) => cabereApi.post('/file', req.payload, req.config);

export const getUploadFileAccess = (req) => cabereApi.get('/file/large', req.config);

export const fetchFileStatus = (req) => cabereApi.get('/file/status', req.config);

export const uploadLargeFile = (req) => axios.post(req.url, req.payload, req.config);
