import fetchApi from '@/api/axios';

export const changePassword = async (newPassword: string): Promise<void> => {
  try {
    await fetchApi.patch('/user/password', {
      password: newPassword,
    });
  } catch (error: any) {
    console.error('비밀번호 변경 실패:', error.response?.data || error.message);
    throw error;
  }
};
