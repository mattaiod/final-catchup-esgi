import axios from 'axios';

const InstanceAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_API,
});

InstanceAxios.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem('session') as string);
  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export default InstanceAxios;
