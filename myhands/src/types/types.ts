export interface QuestInstance {
  questId: string;
  name: string;
  expAmount: number;
}

export interface WeekQuestInstance extends QuestInstance {
  week: number;
}
