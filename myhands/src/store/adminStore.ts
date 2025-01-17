import {create} from 'zustand';
import {getUserProfile, UserInfo} from '@/api/auth';

type TQuestStore = {
  userInfo: UserInfo | null;
  isDuplicateChecked: boolean;
  duplicateError: boolean;
  fetchUserInfo: (userId: number) => Promise<void>;
  setEmployeeNum: (employeeNum: number) => void;
  setDuplicateCheck: (checked: boolean, error: boolean) => void;
};

export const useAdminStore = create<TQuestStore>(set => ({
  userInfo: null,
  isDuplicateChecked: false,
  duplicateError: false,
  fetchUserInfo: async (userId: number) => {
    try {
      const resData = await getUserProfile(userId);
      set({
        userInfo: resData,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  setEmployeeNum: (employeeNum: number) =>
    set(state => ({
      userInfo: state.userInfo ? {...state.userInfo, employeeNum} : null,
    })),
  setDuplicateCheck: (checked, error) =>
    set({
      isDuplicateChecked: checked,
      duplicateError: error,
    }),
}));
