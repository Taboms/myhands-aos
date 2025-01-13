interface StateMapItem {
  title: string;
  subtitle?: string;
  btn: number[];
}

interface StateMap {
  [key: string]: StateMapItem;
}

interface ButtonMapItem {
  color: string;
  label: string;
}

interface ButtonMap {
  [key: number]: ButtonMapItem;
}

export const stateMap: StateMap = {
  Logout: {
    title: '로그아웃 하시겠습니까?',
    btn: [0, 1],
  },
  PasswordChanged: {
    title: '비밀번호 변경 완료',
    subtitle: '변경된 비밀번호로 로그인하세요.',
    btn: [3],
  },
  PasswordChangeWarning: {
    title: '비밀번호 변경',
    subtitle: '비밀번호를 변경하시겠습니까?',
    btn: [0, 1],
  },
  UserJoinFail: {
    title: '회원 생성 실패',
    subtitle: '모든 정보를 입력해주세요.',
    btn: [1],
  },
};

export const buttonMap: ButtonMap = {
  0: {color: '#E6E6E6', label: '취소'},
  1: {color: '#FF5B35', label: '확인'}, // red
  2: {color: '#34C759', label: '변경'},
  3: {color: '#42C374', label: '확인'}, // green
};
