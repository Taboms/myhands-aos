import {create} from 'zustand';
import {postLogin, getProfile} from '@/api/auth';
import {storageKeys} from '@/constants';
import {Profile} from '@/types/domain';
import {
  getAsyncData,
  removeAsyncData,
  setAsyncData,
} from '@/utils/asyncStorage';

type User = Profile;

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
  admin: boolean;
};

type TAuthStore = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  setUser: (user: User) => void;
  setTokens: (tokens: ResponseToken) => void;
};

export const useAuthStore = create<TAuthStore>(set => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAdmin: false,
  isAuthenticated: false,
  isLoading: true,

  setUser: user => set({user}),

  setTokens: async (tokens: ResponseToken) => {
    const {accessToken, refreshToken, admin} = tokens;
    await Promise.all([
      setAsyncData(storageKeys.ACCESS_TOKEN, accessToken),
      setAsyncData(storageKeys.REFRESH_TOKEN, refreshToken),
    ]);
    set({accessToken, refreshToken, isAdmin: admin});
  },

  login: async (id, password) => {
    try {
      // 1. 로그인 요청
      const tokens = await postLogin({id, password});
      await Promise.all([
        setAsyncData(storageKeys.ACCESS_TOKEN, tokens.accessToken),
        setAsyncData(storageKeys.REFRESH_TOKEN, tokens.refreshToken),
        setAsyncData(storageKeys.IS_ADMIN, tokens.admin),
      ]);

      if (tokens.admin === true) {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAdmin: tokens.admin,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }

      // 2. 일반 유저 정보 요청
      const userInfo = await getProfile();
      await setAsyncData(storageKeys.USER, userInfo);

      set({
        user: userInfo,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        isAdmin: tokens.admin,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await Promise.all([
        removeAsyncData(storageKeys.ACCESS_TOKEN),
        removeAsyncData(storageKeys.REFRESH_TOKEN),
        removeAsyncData(storageKeys.USER),
      ]);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAdmin: false,
        isAuthenticated: false,
      });
    } catch (error) {
      throw error;
    }
  },

  initializeAuth: async () => {
    try {
      const [accessToken, refreshToken, isAdmin, savedUser] = await Promise.all(
        [
          getAsyncData(storageKeys.ACCESS_TOKEN),
          getAsyncData(storageKeys.REFRESH_TOKEN),
          getAsyncData(storageKeys.IS_ADMIN),
          getAsyncData(storageKeys.USER),
        ]
      );

      if (accessToken && refreshToken) {
        try {
          if (isAdmin) {
            set({
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isAdmin: true,
              isLoading: false,
            });
            return;
          }

          // 저장된 유저 정보가 있으면 그걸 먼저 사용
          if (savedUser) {
            set({
              user: savedUser,
              isAuthenticated: true,
              isLoading: false,
            });
          }

          // 최신 유저 정보 가져오기
          const userInfo = await getProfile();
          await setAsyncData(storageKeys.USER, userInfo);

          set({
            user: userInfo,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // 프로필 조회 실패 시 로그아웃 처리
          await Promise.all([
            removeAsyncData(storageKeys.ACCESS_TOKEN),
            removeAsyncData(storageKeys.REFRESH_TOKEN),
            removeAsyncData(storageKeys.USER),
          ]);
          set({
            isLoading: false,
            isAuthenticated: false,
            isAdmin: false,
          });
        }
      } else {
        set({isLoading: false});
      }
    } catch (error) {
      set({isLoading: false});
      console.error('Auth initialization failed:', error);
    }
  },
}));
