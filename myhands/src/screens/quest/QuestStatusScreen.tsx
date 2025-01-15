import React from 'react';
import * as St from './QuestStatusScreen.style';
import ExpHistory from '@/components/quest/ExpHistory';
import QuestChallenge from '@/components/quest/QuestChallenge';
import QuestRecord from '@/components/quest/QuestRecord';

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
