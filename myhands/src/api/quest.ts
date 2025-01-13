import axiosInstance from '@/api/axios';
import {Quest, QuestStats} from '@/types/domain';

type ResponseQuestStats = QuestStats;

export interface QuestResponse {
  status: string;
  message: string;
  responseDto: {
    weekCount: number;
    questList: Quest[][];
  };
}

const getQuestStats = async (): Promise<ResponseQuestStats> => {
  const {data} = await axiosInstance.get('/quest/stats');
  return data.responseDto;
};

export {getQuestStats};
