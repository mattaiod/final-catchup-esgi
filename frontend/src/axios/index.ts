import axios from 'axios';

const InstanceAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

InstanceAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default InstanceAxios;