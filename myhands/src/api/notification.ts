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

const deleteRecentAlarm = async (): Promise<AlarmList> => {
  try {
    const {data} = await fetchApi.delete('/alarm');
    if (data.status === 'OK') {
      return data;
    }
    throw new Error(data.message || '최근 알람 삭제에 실패했습니다');
  } catch (error) {
    console.error('알람 삭제 중 에러 발생:', error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('알람 삭제 중 오류가 발생했습니다');
  }
};

const deleteOldAlarm = async (): Promise<AlarmList> => {
  try {
    const {data} = await fetchApi.delete('/alarm/old');
    if (data.status === 'OK') {
      return data;
    }
    throw new Error(data.message || '이전 알람 삭제에 실패했습니다');
  } catch (error) {
    console.error('알람 삭제 중 에러 발생:', error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('알람 삭제 중 오류가 발생했습니다');
  }
};

export {getAlarmList, deleteRecentAlarm, deleteOldAlarm};
