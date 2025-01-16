import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomTextSemiBold from '../styles/CustomTextSemiBold';
import {Exp} from '@/api/mypage';
import {colors, GRADE_COLORS_EXP} from '@/constants';
import {EXP_TYPE} from '@/constants/exp';

type ExpItemProps = {
  quest: Exp;
};

const ExpItem = ({quest}: ExpItemProps) => {
  const {main, background} =
    GRADE_COLORS_EXP[quest.grade as keyof typeof GRADE_COLORS_EXP] ||
    GRADE_COLORS_EXP.OTHER;

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <View style={styles.questHeader}>
        <Text style={[styles.questType]}>
          {EXP_TYPE[quest.questType as keyof typeof EXP_TYPE]}
        </Text>
        <Text style={styles.questDetails}>{quest.completedAt}</Text>
      </View>

      <View style={styles.questHeader}>
        <Text style={[styles.questName]}>{quest.name}</Text>
        <View style={styles.questFooter}>
          <View style={[styles.circle, {backgroundColor: main}]} />
          <Text style={[styles.questExp]}>{quest.expAmount} D</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    marginVertical: 6,
    borderRadius: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 2,
  },
  questType: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: colors.BLACK,
  },
  questDetails: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#8E8E8E',
  },
  questBody: {
    marginTop: 10,
    width: '100%',
    color: colors.BLACK,
  },
  questName: {
    fontFamily: 'Pretendard-Medium',
    top: 2,
    fontSize: 13,
    color: '#242424',
  },
  questFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  questExp: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    color: '#242424',
  },
  circle: {
    top: 1,
    width: 10,
    height: 10,
    borderRadius: 6,
    marginRight: 5,
  },
});

export default ExpItem;
