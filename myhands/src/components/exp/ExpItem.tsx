import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomTextMedium from '../styles/CustomTextMedium';
import CustomTextSemiBold from '../styles/CustomTextSemiBold';
import {Exp} from '@/api/mypage';
import {colors, GRADE_COLORS} from '@/constants';
import {EXP_TYPE} from '@/constants/exp';

type ExpItemProps = {
  quest: Exp;
};

const ExpItem = ({quest}: ExpItemProps) => {
  const {main, background} =
    GRADE_COLORS['quest.grade' as keyof typeof GRADE_COLORS] ||
    GRADE_COLORS.OTHER;

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <View style={styles.questHeader}>
        <CustomTextSemiBold style={[styles.questType]}>
          {EXP_TYPE[quest.questType as keyof typeof EXP_TYPE]}
        </CustomTextSemiBold>
        <CustomTextMedium style={styles.questDetails}>
          {quest.completedAt}
        </CustomTextMedium>
      </View>

      <View style={styles.questHeader}>
        <CustomTextMedium style={[styles.questName]}>
          {quest.name}
        </CustomTextMedium>
        <View style={styles.questFooter}>
          <View style={[styles.circle, {backgroundColor: main}]} />
          <CustomTextMedium style={[styles.questExp]}>
            {quest.expAmount} D
          </CustomTextMedium>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  questType: {
    fontSize: 16,
    color: colors.BLACK,
  },
  questDetails: {
    fontSize: 12,
    color: '#8E8E8E',
  },
  questBody: {
    marginTop: 10,
    width: '100%',
    color: colors.BLACK,
  },
  questName: {
    top: 2,
    fontSize: 14,
    color: colors.BLACK,
  },
  questFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  questExp: {
    fontSize: 14,
    color: colors.BLACK,
  },
  circle: {
    top: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
});

export default ExpItem;
