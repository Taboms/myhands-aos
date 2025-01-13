const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  ADMIN_STATUS: 'adminStatus',
  GET_PASSWORD: 'getPassword',
} as const;

const storageKeys = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  PASSWORD: 'password',
  IS_ADMIN: 'isAdmin',
} as const;

export {queryKeys, storageKeys};
