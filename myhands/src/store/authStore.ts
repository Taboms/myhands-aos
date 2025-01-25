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
  password: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (id: string, password: string, deviceToken: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  setUser: (user: User) => void;
  setTokens: (tokens: ResponseToken) => void;
  setAvartaId: (id: number) => void;
  adminId: string | null;
};

export const useAuthStore = create<TAuthStore>(set => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  password: null,
  isAdmin: false,
  isAuthenticated: false,
  isLoading: true,
  adminId: null,

  setUser: user => set({user}),

  setAvartaId: (id: number) =>
    set(state => ({
      user: state.user ? {...state.user, avartaId: id} : null,
    })),

  setTokens: async (tokens: ResponseToken) => {
    const {accessToken, refreshToken, admin} = tokens;
    await Promise.all([
      setAsyncData(storageKeys.ACCESS_TOKEN, accessToken),
      setAsyncData(storageKeys.REFRESH_TOKEN, refreshToken),
    ]);
    set({accessToken, refreshToken, isAdmin: admin});
  },

  login: async (id, password, deviceToken) => {
    try {
      // 1. 로그인 요청
      const tokens = await postLogin({id, password, deviceToken});
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
          adminId: id,
        });
        return;
      }

      // 2. 일반 유저 정보 요청
      const userInfo = await getProfile();
      set({
        user: userInfo,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        isAdmin: tokens.admin,
        isAuthenticated: true,
        isLoading: false,
        adminId: null,
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
        removeAsyncData(storageKeys.PASSWORD),
        removeAsyncData(storageKeys.ADMINID),
      ]);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAdmin: false,
        isAuthenticated: false,
        adminId: null,
      });
    } catch (error) {
      throw error;
    }
  },

  initializeAuth: async () => {
    try {
      const [accessToken, refreshToken, isAdmin] = await Promise.all([
        getAsyncData(storageKeys.ACCESS_TOKEN),
        getAsyncData(storageKeys.REFRESH_TOKEN),
        getAsyncData(storageKeys.IS_ADMIN),
      ]);

      if (accessToken && refreshToken) {
        // 관리자인 경우
        if (isAdmin) {
          set({
            isAuthenticated: true,
            isAdmin: true,
            isLoading: false,
          });
          return;
        }

        // 일반 유저
        try {
          // 최신 유저 정보 가져오기
          const userInfo = await getProfile();
          set({
            user: userInfo, // 유저 정보
            isAuthenticated: true, // 인증 여부
            isAdmin: false,
            isLoading: false,
          });
        } catch (error) {
          // 프로필 조회 실패 시 로그아웃 처리
          await Promise.all([
            removeAsyncData(storageKeys.ACCESS_TOKEN),
            removeAsyncData(storageKeys.REFRESH_TOKEN),
            removeAsyncData(storageKeys.IS_ADMIN),
          ]);
          set({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false,
          });
        }
      } else {
        await Promise.all([
          removeAsyncData(storageKeys.ACCESS_TOKEN),
          removeAsyncData(storageKeys.REFRESH_TOKEN),
          removeAsyncData(storageKeys.IS_ADMIN),
        ]);
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isLoading: false,
        });
      }
    } catch (error) {
      await Promise.all([
        removeAsyncData(storageKeys.ACCESS_TOKEN),
        removeAsyncData(storageKeys.REFRESH_TOKEN),
        removeAsyncData(storageKeys.IS_ADMIN),
      ]);
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
      });
      console.error('Auth initialization failed:', error);
    }
  },
}));
