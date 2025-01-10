const loggedOutNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
} as const;

const loggedInNavigations = {
  BOARD_HOME: 'BoardHome',
  CALENDAR_HOME: 'CalendarHome',
  MESSENGER_HOME: 'MessengerHome',
  MYPAGE_HOME: 'MypageHome',
  BOARD_DETAIL: 'BoardDetail',
} as const;

export {loggedOutNavigations, loggedInNavigations};
