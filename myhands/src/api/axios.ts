import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://myhands.store',
  withCredentials: true,
});

export default axiosInstance;
