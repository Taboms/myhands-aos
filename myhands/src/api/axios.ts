import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import {useAuthStore} from '@/store/authStore';
import {getAsyncData, setAsyncData} from '@/utils/asyncStorage';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
  _retry?: boolean;
}

export const fetchApi: AxiosInstance = axios.create({
  baseURL: 'https://myhands.store',
  withCredentials: true,
});

fetchApi.interceptors.request.use(
  async (config): Promise<AdaptAxiosRequestConfig> => {
    const accessToken = await getAsyncData('accessToken');

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

fetchApi.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AdaptAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getAsyncData('refreshToken');
        const response = await fetchApi.post('/auth/refresh', {
          refreshToken,
        });

        const {accessToken: newAccessToken} = response.data;
        await setAsyncData('accessToken', newAccessToken);

        fetchApi.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return fetchApi(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default fetchApi;
