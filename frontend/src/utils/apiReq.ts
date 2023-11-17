import axios from 'axios';
import { lsGet } from './utils';
import { STORAGE_KEY_USER } from '../constant/constant';

const apiReq = axios.create({
  baseURL: 'http://localhost:5005',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiReq.interceptors.request.use(
  (config) => {
    const token = lsGet(STORAGE_KEY_USER)?.token;
    token && (config.headers.Authorization = `Bearer ${token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiReq.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error.response?.data.error || 'Network Error');
  }
);
export default apiReq;
