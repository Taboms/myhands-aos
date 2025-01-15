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
        setAsyncData(storageKeys.PASSWORD, password),
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
        setAsyncData(storageKeys.ADMINID, id);
        return;
      }

      // 2. 일반 유저 정보 요청
      const userInfo = await getProfile();
      await setAsyncData(storageKeys.USER, userInfo);

      set({
        user: userInfo,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        password: userInfo.password,
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
      const [
        accessToken,
        refreshToken,
        isAdmin,
        savedUser,
        savedPassword,
        adminId,
      ] = await Promise.all([
        getAsyncData(storageKeys.ACCESS_TOKEN),
        getAsyncData(storageKeys.REFRESH_TOKEN),
        getAsyncData(storageKeys.IS_ADMIN),
        getAsyncData(storageKeys.USER),
        getAsyncData(storageKeys.PASSWORD),
        getAsyncData(storageKeys.ADMINID),
      ]);

      if (accessToken && refreshToken) {
        try {
          if (isAdmin) {
            set({
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isAdmin: true,
              isLoading: false,
              adminId,
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
            password: savedPassword || null,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            adminId: null,
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
            adminId: null,
          });
        }
      } else {
        await Promise.all([
          removeAsyncData(storageKeys.ACCESS_TOKEN),
          removeAsyncData(storageKeys.REFRESH_TOKEN),
          removeAsyncData(storageKeys.USER),
        ]);
        set({
          isLoading: false,
          isAuthenticated: false,
          isAdmin: false,
          adminId: null,
        });
      }
    } catch (error) {
      await Promise.all([
        removeAsyncData(storageKeys.ACCESS_TOKEN),
        removeAsyncData(storageKeys.REFRESH_TOKEN),
        removeAsyncData(storageKeys.USER),
      ]);
      set({
        isLoading: false,
        isAuthenticated: false,
        isAdmin: false,
        adminId: null,
      });
      console.error('Auth initialization failed:', error);
    }
  },
}));
