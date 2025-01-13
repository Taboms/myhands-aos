import axiosInstance, {fetchApi} from '@/api/axios';
import {storageKeys} from '@/constants';
import {Profile} from '@/types/domain';
import {getAsyncData} from '@/utils/asyncStorage';

type RequestUser = {
  id: string;
  password: string;
};

type ResponseUser = {
  accessToken: string;
  refreshToken: string;
  admin: boolean;
};

const postLogin = async ({
  id,
  password,
}: RequestUser): Promise<ResponseUser> => {
  const {data} = await axiosInstance.post('/user/login', {
    id,
    password,
  });
  return data.responseDto;
};

type ResponseProfile = Profile;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await fetchApi.get('/user/info');
  return data.responseDto;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
  admin: boolean;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getAsyncData(storageKeys.REFRESH_TOKEN);
  const {data} = await axiosInstance.post(
    '/auth/retoken',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  return data;
};

const logout = async () => {
  await fetchApi.delete('/user/logout');
};

export {postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
