import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
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
      <CustomTextSemiBold style={styles.title}>경험치 현황</CustomTextSemiBold>
      <View style={styles.Header}>
        <CustomTextSemiBold style={styles.Title}>
          최근 획득 경험치
        </CustomTextSemiBold>
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
        <CustomTextBold style={styles.barLabel}>
          올해 획득한 경험치 {thisYearExp.expAmount}
        </CustomTextBold>
        <ProgressBar
          height={20}
          percentage={thisYearExp.percent}
          fontSize={15}
        />
        <CustomTextBold style={styles.barLabel}>
          작년까지 획득한 경험치 {lastYearExp.expAmount}
        </CustomTextBold>
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
    paddingVertical: 12,
    width: '100%',
  },
  title: {
    fontSize: 19,
    color: colors.BLACK,
    marginBottom: 10,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  Title: {
    fontSize: 16,
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
  barContainer: {
    marginTop: 5,
  },
  barLabel: {
    top: 8,
    marginTop: 5,
  },
});

export default ExperienceStatus;
