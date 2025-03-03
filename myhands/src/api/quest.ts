import {fetchApi} from '@/api/axios';
import {QuestCalendar, QuestStats} from '@/types/domain';

export interface QuestResponse {
  status: string;
  message: string;
  responseDto: QuestCalendar;
}

const getQuestStats = async (): Promise<QuestStats> => {
  try {
    const {data} = await fetchApi.get('/quest/stats');
    if (data.status === 'OK') {
      console.log('data.responseDto: ', data.responseDto);
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to get quest stats');
  } catch (error) {
    console.error('Error get quest stats:', error);
    throw error;
  }
};

interface ResponseQuestCalendar {
  status: string;
  message: string;
  responseDto: QuestCalendar;
}

const getQuestCalendar = async (
  year: number,
  month: number
): Promise<QuestCalendar> => {
  try {
    const {data} = await fetchApi.get<ResponseQuestCalendar>(
      `/quest/calendar-ios?year=${year}&month=${month}`
    );
    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to get quest calendar');
  } catch (error) {
    console.error('Error get quest calendar:', error);
    throw error;
  }
};

export {getQuestStats, getQuestCalendar};
