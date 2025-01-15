import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomTextSemiBold from '../styles/CustomTextSemiBold';
import {colors} from '@/constants';
import {useQuestStore} from '@/store/questStore';
import calculateWeeks from '@/utils/calculateWeeks';

type WeekInfo = {
  month: number;
  week: number;
};

type Result = 'MAX' | 'MED' | 'ETC' | 'FAIL';

interface WeekRecordProps {
  weekInfo?: WeekInfo[];
  resultList?: Result[];
}

function WeeklyTimeline({weekInfo = calculateWeeks()}: WeekRecordProps) {
  const resultList = useQuestStore(state => state.questStats?.resultList ?? []);
  const getCircleStyle = (index: number) => {
    if (index >= 4) {
      return styles.futureCircle;
    }
    if (index === 3) {
      return styles.currentCircle;
    }

    const result = resultList[index] || 'NONE';
    switch (result) {
      case 'MAX':
        return styles.maxCircle;
      case 'MED':
        return styles.medCircle;
      case 'ETC':
        return styles.etcCircle;
      case 'MIN':
      case 'FAIL':
        return styles.failCircle;
      default:
        return styles.defaultCircle;
    }
  };

  const shouldShowCheck = (index: number) => {
    if (index >= 3) {
      return false;
    }
    const result = resultList[index];
    return ['MAX', 'MED', 'ETC'].includes(result);
  };

  const shouldShowMonth = (currentMonth: number, index: number) => {
    if (index === 0) {
      return true;
    }
    return currentMonth !== weekInfo[index - 1].month;
  };

  return (
    <View style={styles.container}>
      {weekInfo.map((info, index) => {
        const showMonth = shouldShowMonth(info.month, index);

        return (
          <View key={index} style={styles.weekItem}>
            <View style={styles.monthContainer}>
              <CustomTextSemiBold
                style={[
                  styles.monthText,
                  index === 3 && showMonth && {color: colors.MAX},
                ]}
              >
                {showMonth ? `${info.month}월` : ''}
              </CustomTextSemiBold>
            </View>
            <View style={[styles.circle, getCircleStyle(index)]}>
              {shouldShowCheck(index) && (
                <Icon name="check" size={20} color="#FFFFFF" />
              )}
            </View>
            <Text
              style={[styles.weekText, index === 3 && {color: colors.MAX}]}
            >{`${info.week}주`}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  weekItem: {
    alignItems: 'center',
  },
  monthContainer: {
    height: 24,
    justifyContent: 'center',
    marginBottom: 5,
  },
  monthText: {
    fontSize: 12,
    color: '#A7A7A7',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  maxCircle: {
    backgroundColor: colors.MAX,
  },
  medCircle: {
    backgroundColor: colors.MED,
  },
  etcCircle: {
    backgroundColor: colors.ETC,
  },
  failCircle: {
    backgroundColor: colors.FAIL,
  },
  currentCircle: {
    borderWidth: 2,
    borderColor: colors.MAX,
    backgroundColor: '#FFFFFF',
  },
  futureCircle: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
  },
  defaultCircle: {
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  weekText: {
    fontSize: 12,
    color: '#A7A7A7',
  },
});

export default WeeklyTimeline;
