import fetchApi from './axios';

type Team = {
  departmentId: number;
  expAvg: number;
  rank: number;
};

type ResponseRankingData = {
  status: string;
  message: string;
  responseDto: {
    rankList: Team[];
    myIndex: number;
    needExp: number;
  };
};

const getRankingData = async (): Promise<
  ResponseRankingData['responseDto']
> => {
  try {
    const {data} = await fetchApi.get<ResponseRankingData>('exp/rank');
    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch ranking data');
  } catch (error) {
    console.error('Error fetching ranking data:', error);
    throw error;
  }
};

export {getRankingData};
export type {Team, ResponseRankingData};
