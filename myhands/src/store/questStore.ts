import {create} from 'zustand';
import {getQuestStats} from '@/api/quest';
import {QuestStats} from '@/types/domain';

type TQuestStore = {
  questStats: QuestStats | null;
  isLoading: boolean;
  fetchQuestStats: () => Promise<void>;
};

export const useQuestStore = create<TQuestStore>(set => ({
  questStats: null,
  isLoading: true,

  // 달성 통계 데이터
  fetchQuestStats: async () => {
    const stats = await getQuestStats();
    set({
      questStats: stats,
      isLoading: false,
    });
  },
}));
