import {addHours, format} from 'date-fns';
import {create} from 'zustand';
import {getQuestStats, getQuestCalendar} from '@/api/quest';
import {QuestStats, QuestCalendar} from '@/types/domain';

type TQuestStore = {
  questStats: QuestStats | null;
  questCalendar: QuestCalendar | null;
  isLoading: boolean;
  fetchQuestData: () => Promise<void>;
};

export const useQuestStore = create<TQuestStore>(set => ({
  questStats: null,
  questCalendar: null,
  isLoading: true,

  fetchQuestData: async () => {
    try {
      // Get quest stats
      const stats = await getQuestStats();

      // Get calendar data
      // const utcNow = new Date();
      // const koreaTime = addHours(utcNow, 9);
      // const year = parseInt(format(koreaTime, 'yyyy'), 10);
      // const month = parseInt(format(koreaTime, 'M'), 10);
      // const calendar = await getQuestCalendar(year, month);

      set({
        questStats: stats,
        // questCalendar: calendar,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching quest data:', error);
      set({isLoading: false});
    }
  },
}));
