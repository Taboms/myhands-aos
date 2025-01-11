import axiosInstance from '@/api/axios';
import {Profile} from '@/types/domain';
import {getEncryptStorage} from '@/utils';

type RequestUser = {
  id: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
  admin: boolean;
};

const postLogin = async ({
  id,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/user/login', {
    id,
    password,
  });
  return data.responseDto;
};

type ResponseProfile = Profile;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/user/info');

  return data.responseDto;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/retoken', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/user/logout');
};

export {postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
