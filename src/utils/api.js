import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`,
});

// If you have a token, you can attach it automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;