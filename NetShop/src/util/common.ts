import axios from 'axios';

export const BASE_API_URL = 'http://localhost:3000';
export const BASE_API_URL_ANDROID = 'http://10.0.2.2:3000';
export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});
