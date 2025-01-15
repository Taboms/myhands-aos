import {GRADE_COLORS} from '@/constants';
import {Quest} from '@/types/domain';

export const calculateTotalExp = (quests: Quest[]): number => {
  return quests.reduce((total, quest) => total + quest.expAmount, 0);
};

export const getGradeColor = (quests: Quest[]) => {
  if (quests.length === 0) {
    return GRADE_COLORS.FAIL;
  }

  const highestExpQuest = quests[0];

  switch (highestExpQuest.grade) {
    case 'MAX':
      return GRADE_COLORS.MAX;
    case 'MED':
      return GRADE_COLORS.MED;
    case 'MIN':
      return GRADE_COLORS.FAIL;
    default:
      return GRADE_COLORS.OTHER;
  }
};
