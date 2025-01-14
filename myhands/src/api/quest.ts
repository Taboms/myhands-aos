import axiosInstance from '@/api/axios';
import {Quest, QuestCalendar, QuestStats} from '@/types/domain';

type ResponseQuestStats = QuestStats;

export interface QuestResponse {
  status: string;
  message: string;
  responseDto: QuestCalendar;
}

const getQuestStats = async (): Promise<ResponseQuestStats> => {
  const {data} = await axiosInstance.get('/quest/stats');
  return data.responseDto;
};

// const getQuestCalender

export {getQuestStats};
