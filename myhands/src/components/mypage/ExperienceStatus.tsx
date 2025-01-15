import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import ExpItem from '../exp/ExpItem';
import {YearExp, Exp} from '@/api/mypage';
import ProgressBar from '@/components/mypage/ProgressBar';
import CustomTextBold from '@/components/styles/CustomTextBold';
import CustomTextMedium from '@/components/styles/CustomTextMedium';
import CustomTextSemiBold from '@/components/styles/CustomTextSemiBold';
import {colors, loggedInNavigations} from '@/constants';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';

type NavigationProp = StackNavigationProp<LoggedInStackParamList, 'ExpAll'>;

type ExperienceStatusProps = {
  recentExp: Exp;
  thisYearExp: YearExp;
  lastYearExp: YearExp;
};

const ExperienceStatus = ({
  recentExp,
  thisYearExp,
  lastYearExp,
}: ExperienceStatusProps) => {
  const navigation = useNavigation<NavigationProp>();

  const handleViewAllPress = () => {
    navigation.navigate(loggedInNavigations.EXP_ALL);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>경험치 현황</Text>
      <View style={styles.Header}>
        <CustomTextBold style={styles.Title}>최근 획득 경험치</CustomTextBold>
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={handleViewAllPress}
        >
          <CustomTextMedium style={styles.viewAll}>전체보기</CustomTextMedium>
          <Feather name="chevron-right" size={16} color={colors.GRAY_700} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleViewAllPress}>
        <ExpItem quest={recentExp} />
      </TouchableOpacity>

      <View style={styles.barContainer}>
        <View style={styles.barInfo}>
          <CustomTextBold style={styles.barLabel}>
            올해 획득한 경험치
          </CustomTextBold>
          <Text style={styles.barAmount}>{thisYearExp.expAmount}</Text>
        </View>
        <ProgressBar
          height={20}
          percentage={thisYearExp.percent}
          fontSize={15}
        />
        <View style={styles.barInfo}>
          <CustomTextBold style={styles.barLabel}>
            작년까지 획득한 경험치
          </CustomTextBold>
          <Text style={styles.barAmount}>{lastYearExp.expAmount}</Text>
        </View>
        <ProgressBar
          height={20}
          percentage={lastYearExp.percent}
          fontSize={15}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 15,
    fontFamily: 'Pretendard-SemiBold',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  Title: {
    fontSize: 14,
    color: '#494949',
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    top: -1,
    fontSize: 13,
    color: colors.GRAY_700,
    marginRight: 2,
  },
  viewAllArrow: {
    fontSize: 13,
    color: colors.GRAY_700,
  },
  barContainer: {},
  barInfo: {
    marginTop: 15,
    flexDirection: 'row',
  },
  barLabel: {
    fontSize: 14,
    marginRight: 5,
    marginBottom: 5,
  },
  barAmount: {
    fontFamily: 'Pretendard-Medium',
  },
});

export default ExperienceStatus;
