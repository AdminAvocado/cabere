import axios from 'axios';
import { Auth } from 'aws-amplify';

const COMMON_HEADERS = { 'Content-Type': 'application/json' };

const requestAuthHandler = async (request) => {
  try {
    const currentSession = await Auth.currentSession();
    const { idToken } = currentSession;
    request.headers.Authorization = `Bearer ${idToken.jwtToken}`;
  } catch (e) {
    console.log('Unable to refresh Token', e);
  }
  return request;
};

const http = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const instance = axios.create({
    baseURL,
    headers: COMMON_HEADERS,
  });

  instance.interceptors.request.use(
    (request) => requestAuthHandler(request),
  );
  return instance;
};

export default http();
