import React from 'react';
import * as St from './QuestStatusScreen.style';
import ExpHistory from '@/components/quest/ExpHistory';
import QuestChallenge from '@/components/quest/QuestChallenge';
import QuestRecord from '@/components/quest/QuestRecord';

export type QuestTabParamList = {
  QuestAchievement: {
    challengeCount: number;
    resultList: string[];
    questRate: number;
    maxCount: number;
    historySize: number;
    expHistory: Record<string, number>;
  };
  QuestHistory: undefined;
};

function QuestStatusScreen() {
  return (
    <St.Container>
      <QuestChallenge />
      <QuestRecord />
      <ExpHistory />
    </St.Container>
  );
}

export default QuestStatusScreen;
