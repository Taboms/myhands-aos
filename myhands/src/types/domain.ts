interface Profile {
  userId: number;
  name: string;
  id: string;
  password: string;
  employeeNum: number;
  joinedAt: string;
  department: string;
  avartaId: number;
  level: string;
}

interface QuestStats {
  challengeCount: number;
  resultList: string[];
  questRate: number;
  maxCount: number;
  historySize: number;
  expHistory: Record<string, number>;
}

interface Quest {
  questId: number;
  questType: string;
  name: string;
  grade: string;
  expAmount: number;
  isCompleted: boolean;
  completedAt: string;
}

export type {Profile, QuestStats, Quest};
