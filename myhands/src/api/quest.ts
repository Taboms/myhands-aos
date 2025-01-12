import axiosInstance from '@/api/axios';
import {QuestStats} from '@/types/domain';

type ResponseQuestStats = QuestStats;

const getQuestStats = async (): Promise<ResponseQuestStats> => {
  const {data} = await axiosInstance.get('/quest/stats');
  return data.responseDto;
};

export {getQuestStats};
