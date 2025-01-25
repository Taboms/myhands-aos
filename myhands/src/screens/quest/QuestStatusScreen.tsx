import React from 'react';
import * as St from './QuestStatusScreen.style';
import ExpHistory from '@/components/quest/questStatus/ExpHistory';
import QuestChallenge from '@/components/quest/questStatus/QuestChallenge';
import QuestRecord from '@/components/quest/questStatus/QuestRecord';

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
