import cabereApi from './cabereApi.config';

export const fetchClient = (req) => cabereApi.get(`/client?clientNumber=${req.params.number}&rfc=${req.params.rfc}`, req.config);
