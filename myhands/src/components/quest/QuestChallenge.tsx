// 연속 도전
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as St from './QuestChallenge.style';
import WeekRecord from './WeekRecord';
import {colors} from '@/constants';

function QuestChallenge() {
  return (
    <St.Container>
      <St.ChallengeInfo>
        <St.Info>
          <St.InfoText>현재 이서님은</St.InfoText>
          <St.BottomInfoText>
            <St.PointText>3주</St.PointText>
            <St.BottomText>연속 도전 중 💪</St.BottomText>
          </St.BottomInfoText>
        </St.Info>
        <St.InfoStandard>
          <St.Standard>
            <St.ColorBox $color={colors.MAX} />
            <St.StandardText>MAX</St.StandardText>
          </St.Standard>
          <St.Standard>
            <St.ColorBox $color={colors.MED} />
            <St.StandardText>MED</St.StandardText>
          </St.Standard>
          <St.Standard>
            <St.ColorBox $color={colors.ETC} />
            <St.StandardText>기타</St.StandardText>
          </St.Standard>
        </St.InfoStandard>
      </St.ChallengeInfo>
      <WeekRecord />
    </St.Container>
  );
}

const styles = StyleSheet.create({});

export default QuestChallenge;
