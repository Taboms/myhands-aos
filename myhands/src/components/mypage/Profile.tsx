import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
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
      <View style={styles.line} />
      <View style={styles.profileHeader}>
        <Image
          source={characterImages[user?.avartaId || 1]}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <CustomTextBold style={styles.greeting}>
            {user?.name}님, 안녕하세요!
          </CustomTextBold>
          {/* <View style={styles.separator} /> */}
          <Text style={styles.fortuneDate}>
            {`${formatDate(fortune.date)} 오늘의 운세`}
          </Text>
          <CustomTextMedium style={styles.fortuneContent}>
            {fortune.contents}
          </CustomTextMedium>
        </View>
      </View>

      <View style={styles.levelInfo}>
        <View style={styles.levelRowTop}>
          <Text style={[styles.levelText, styles.alignRight]}>
            내년도 예상 레벨
          </Text>
        </View>
        <View style={styles.levelRow}>
          <CustomTextBold style={styles.currentLevel}>
            {levelRate.currentLevel} {levelRate.currentExp}
          </CustomTextBold>
          <CustomTextBold style={styles.nextYearLevel}>
            {levelRate.nextLevel} 승급까지 {levelRate.leftExp}
          </CustomTextBold>
        </View>
        <ProgressBar percentage={levelRate.percent} height={26} fontSize={17} />
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
    position: 'relative',
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 70,
    height: 1,
    backgroundColor: '#C5C5C5',
    zIndex: 0,
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
    fontSize: 17,
    color: colors.BLACK,
    marginBottom: 25,
  },
  fortuneDate: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
    color: colors.BLACK,
    marginBottom: 0,
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
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14.5,
    color: colors.RED_800,
  },
  nextYearLevel: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14.5,
    color: colors.RED_800,
  },
  levelText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
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
    borderColor: '#454545',
  },
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.GRAY_500,
    marginVertical: 8,
  },
  levelRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 25,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  alignRight: {
    textAlign: 'right',
    flex: 1,
  },
});

export default Profile;
