import fetchApi from './axios';

export type Exp = {
  questId: number;
  questType: string;
  name: string;
  grade: string;
  expAmount: number;
  isCompleted: boolean;
  completedAt: string;
};

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

type ResponseMypageData = {
  status: string;
  message: string;
  responseDto: {
    fortune: Fortune;
    levelRate: LevelRate;
    recentExp: Exp;
    thisYearExp: YearExp;
    lastYearExp: YearExp;
  };
};

type ResponseExpListData = {
  status: string;
  message: string;
  responseDto: {
    quests: Exp[];
    hasMore: boolean;
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
};

const getMypageData = async (): Promise<ResponseMypageData['responseDto']> => {
  try {
    const {data} = await fetchApi.get<ResponseMypageData>('user/mypage');
    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch mypage data');
  } catch (error) {
    console.error('Error fetching mypage data:', error);
    throw error;
  }
};

const getExpListData = async (
  size: number,
  page: number
): Promise<ResponseExpListData['responseDto']> => {
  try {
    const {data} = await fetchApi.get<ResponseExpListData>(
      `quest/completelist?size=${size}&page=${page}`
    );
    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch exp list');
  } catch (error) {
    console.error('Error fetching exp list data:', error);
    throw error;
  }
};

export {getMypageData, getExpListData};
export type {
  ResponseMypageData,
  Fortune,
  LevelRate,
  YearExp,
  ResponseExpListData,
};
