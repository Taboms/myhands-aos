import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Fortune, LevelRate} from '@/api/mypage';
import ProgressBar from '@/components/mypage/ProgressBar';
import CustomTextBold from '@/components/styles/CustomTextBold';
import CustomTextMedium from '@/components/styles/CustomTextMedium';
import CustomTextSemiBold from '@/components/styles/CustomTextSemiBold';
import {colors} from '@/constants';
import {characterImages} from '@/constants/character';
import {useAuthStore} from '@/store/authStore';

type ProfileProps = {
  fortune: Fortune;
  levelRate: LevelRate;
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();

  return `${month}월 ${day}일`;
};

const Profile = ({fortune, levelRate}: ProfileProps) => {
  const user = useAuthStore(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={characterImages[user?.avartaId || 1]}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <CustomTextSemiBold style={styles.greeting}>
            {user?.name}님, 안녕하세요!
          </CustomTextSemiBold>
          <View style={styles.separator} />
          <CustomTextSemiBold style={styles.fortuneDate}>
            {`${formatDate(fortune.date)} 오늘의 운세`}
          </CustomTextSemiBold>
          <CustomTextMedium style={styles.fortuneContent}>
            {fortune.contents}
          </CustomTextMedium>
        </View>
      </View>

      <View style={styles.levelInfo}>
        <View style={styles.levelRow}>
          <CustomTextSemiBold style={[styles.levelText, styles.alignRight]}>
            내년도 예상 레벨
          </CustomTextSemiBold>
        </View>
        <View style={styles.levelRow}>
          <CustomTextBold style={styles.currentLevel}>
            {levelRate.currentLevel} {levelRate.currentExp}
          </CustomTextBold>
          <CustomTextBold style={styles.nextYearLevel}>
            {levelRate.nextLevel} 승급까지 {levelRate.leftExp}
          </CustomTextBold>
        </View>
        <ProgressBar percentage={levelRate.percent} height={26} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    width: '100%',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingTop: 18,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  greeting: {
    fontSize: 19,
    color: colors.BLACK,
  },
  fortuneDate: {
    fontSize: 15,
    color: colors.BLACK,
    marginBottom: 2,
  },
  fortuneContent: {
    fontSize: 13,
    color: '#777777',
  },
  levelInfo: {
    marginTop: -5,
    paddingRight: 3,
    marginBottom: 5,
  },
  currentLevel: {
    top: 5,
    fontSize: 20,
    color: colors.RED_800,
  },
  nextYearLevel: {
    top: 9,
    fontSize: 16,
    color: colors.RED_800,
  },
  levelText: {
    top: 7,
    color: colors.GRAY_700,
  },
  avatar: {
    marginLeft: 8,
    marginTop: 10,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1.8,
    borderColor: colors.BLACK,
  },
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.GRAY_500,
    marginVertical: 8,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignRight: {
    textAlign: 'right',
    flex: 1,
  },
});

export default Profile;
