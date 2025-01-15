import fetchApi from './axios';
import {Alarm} from '@/types/domain';

export interface AlarmList {
  recentAlarmList: Alarm[];
  oldAlarmList: Alarm[];
}

interface ResponseAlarmList {
  status: string;
  message: string;
  responseDto: AlarmList;
}

const getAlarmList = async (): Promise<AlarmList> => {
  try {
    const {data} = await fetchApi.get<ResponseAlarmList>('/alarm');
    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to get quest stats');
  } catch (error) {
    console.error('Error get quest stats:', error);
    throw error;
  }
};

export {getAlarmList};
