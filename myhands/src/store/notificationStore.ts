import {create} from 'zustand';
import {getAlarmList} from '@/api/notification';
import {Alarm} from '@/types/domain';

type TNotificationStore = {
  hasNew: boolean;
  isLoading: boolean;
  notiList: {
    recentAlarmList: Alarm[];
    oldAlarmList: Alarm[];
  };
  fetchNotiList: () => Promise<void>;
};

export const useNotificationStore = create<TNotificationStore>(set => ({
  hasNew: false,
  isLoading: true,
  notiList: {
    recentAlarmList: [],
    oldAlarmList: [],
  },
  fetchNotiList: async () => {
    set({isLoading: true});
    try {
      const data = await getAlarmList();
      set({notiList: data});
    } catch (error) {
      console.error('Error fetching notification list:', error);
      set({isLoading: false});
    }
  },
}));
