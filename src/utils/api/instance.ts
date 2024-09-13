import axios from 'axios';

import { BASE_URL } from '../constants';

export const api = axios.create({ baseURL: BASE_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.set('authorization', `Bearer ${token}`);
  }
  return config;
});
