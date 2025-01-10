const loggedOutNavigations = {
  LOGIN: 'Login',
} as const;

const loggedInNavigations = {
  MYPAGE_HOME: 'MypageHome',
  QUEST_HOME: 'QuestHome',
  RACE_HOME: 'RaceHome',
  BOARD_HOME: 'BoardHome',
  BOARD_DETAIL: 'BoardDetail',
  CHANGE_PASSWORD: 'ChangePassword',
  CHANGE_PROFILE: 'ChangeProfile',
  NOTIFICATIONS: 'Notifications',
} as const;

const adminNavigations = {
  ADMIN_HOME: 'AdminHome',
  ADMIN_SIGNUP: 'AdminSignup',
  ADMIN_USER_LIST: 'AdminUserList',
  ADMIN_WRITE_POST: 'AdminWritePost',
  ADMIN_POST_LIST: 'AdminPostList',
} as const;

export {loggedOutNavigations, loggedInNavigations, adminNavigations};
