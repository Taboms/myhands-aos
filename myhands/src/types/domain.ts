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

export type {Profile, QuestStats};
