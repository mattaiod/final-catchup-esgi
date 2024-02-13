import axios from 'axios';

const InstanceAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_API,
});

InstanceAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default InstanceAxios;