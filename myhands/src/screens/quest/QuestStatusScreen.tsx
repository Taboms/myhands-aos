import React from 'react';
import {View, Text} from 'react-native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import * as St from './QuestStatusScreen.style';
import ExpHistory from '@/components/quest/ExpHistory';
import QuestChallenge from '@/components/quest/QuestChallenge';
import QuestRecord from '@/components/quest/QuestRecord';

export type QuestTabParamList = {
  QuestAchievement: {
    challengeCount: number;
    resultList: string[];
  };
  QuestHistory: undefined;
};

// QuestStatusScreen의 props 타입 정의
type QuestStatusScreenProps = MaterialTopTabScreenProps<
  QuestTabParamList,
  'QuestAchievement'
>;

type Props = MaterialTopTabScreenProps<QuestTabParamList, 'QuestAchievement'>;

function QuestStatusScreen({route}: Props) {
  const {challengeCount, resultList} = route.params;

  return (
    <St.Container>
      {/* <Text>최대: {challengeCount}</Text>
      <Text>기록: {resultList}</Text> */}
      <QuestChallenge />
      <QuestRecord />
      <ExpHistory />
    </St.Container>
  );
}

export default QuestStatusScreen;
