import fetchApi from './axios';

type Fortune = {
  date: string;
  contents: string;
};

type LevelRate = {
  currentLevel: string;
  currentExp: number;
  nextLevel: string;
  leftExp: number;
  percent: number;
};

type YearExp = {
  expAmount: number;
  percent: number;
};

type RecentExp = {
  questId: number;
  questType: string;
  name: string;
  grade: string;
  expAmount: number;
  isCompleted: boolean;
  completedAt: string;
};

type ResponseMypageData = {
  status: string;
  message: string;
  responseDto: {
    fortune: Fortune;
    levelRate: LevelRate;
    recentExp: RecentExp;
    thisYearExp: YearExp;
    lastYearExp: YearExp;
  };
};

const getMypageData = async (): Promise<ResponseMypageData['responseDto']> => {
  try {
    const {data} = await fetchApi.get<ResponseMypageData>('user/mypage');
    if (data.status === 'OK') {
      console.log(data.responseDto);
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch mypage data');
  } catch (error) {
    console.error('Error fetching mypage data:', error);
    throw error;
  }
};

export {getMypageData};
export type {ResponseMypageData, Fortune, LevelRate, RecentExp, YearExp};
