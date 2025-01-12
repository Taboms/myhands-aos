import axiosInstance from '@/api/axios';
import {storageKeys} from '@/constants';
import {Profile} from '@/types/domain';
import {getEncryptStorage} from '@/utils';

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
  const {data} = await axiosInstance.get('/user/info');

  return data.responseDto;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
  admin: boolean;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);
  console.log(`refreshToken: ${refreshToken}`);
  const {data} = await axiosInstance.post(
    '/auth/retoken',
    {}, // request body (비어있는 경우)
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  return data;
};

const logout = async () => {
  await axiosInstance.post('/user/logout');
};

export {postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
