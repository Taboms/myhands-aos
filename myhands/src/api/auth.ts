import axiosInstance, {fetchApi} from '@/api/axios';
import {storageKeys} from '@/constants';
import {Profile} from '@/types/domain';
import {getAsyncData} from '@/utils/asyncStorage';

type RequestUser = {
  id: string;
  password: string;
  deviceToken: string;
};

type ResponseUser = {
  accessToken: string;
  refreshToken: string;
  admin: boolean;
};

const postLogin = async ({
  id,
  password,
  deviceToken,
}: RequestUser): Promise<ResponseUser> => {
  const {data} = await axiosInstance.post('/user/login', {
    id,
    password,
    deviceToken,
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

type ResponseAdmin = {
  status: string;
  message: string;
  code?: string;
};

const duplicateCheck = async (id: string) => {
  try {
    const response = await fetchApi.get<ResponseAdmin>(
      `/user/duplicate?id=${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface SignupFormData {
  name: string;
  id: string;
  password: string;
  joinedAt: string;
  departmentId: number;
  jobGroup: number;
  group: string;
}

interface RequestCreateBoard {
  title: string;
  content: string;
}

const postCreateBoard = async (title: string, content: string) => {
  try {
    const response = await fetchApi.post('board/create', {
      title: title,
      content: content,
    });
    return response.status;
  } catch (error) {
    console.error('Error sign up', error);
    throw error;
  }
};

const singUp = async (data: SignupFormData): Promise<ResponseAdmin> => {
  try {
    const response = await fetchApi.post<ResponseAdmin>('user/join', {
      name: data.name,
      id: data.id,
      password: data.password,
      joinedAt: data.joinedAt,
      departmentId: data.departmentId,
      jobGroup: data.jobGroup,
      group: data.group,
    });
    return response.data;
  } catch (error) {
    console.error('Error sign up', error);
    throw error;
  }
};

export {
  postLogin,
  getProfile,
  getAccessToken,
  logout,
  duplicateCheck,
  singUp,
  postCreateBoard,
};
export type {RequestUser, ResponseToken, ResponseProfile};
