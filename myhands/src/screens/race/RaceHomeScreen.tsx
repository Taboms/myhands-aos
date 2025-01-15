import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {colors} from '@/constants';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';

interface RaceHomeScreenProps {
  navigation: BottomTabNavigationProp<LoggedInStackParamList>;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function RaceHomeScreen({navigation}: RaceHomeScreenProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextSunday = new Date();

      // 다음 일요일 자정까지
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
      nextSunday.setHours(24, 0, 0, 0);

      const difference = nextSunday.getTime() - now.getTime();

      if (difference < 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({days, hours, minutes, seconds});
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.timeWrapper}>
        <Text style={styles.title}>이번 주 레이스 마감까지</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분{' '}
            {timeLeft.seconds}초
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FFEFEC',
  },
  timeWrapper: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '10%',
    // paddingHorizontal: '10%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#000',
  },
  timerContainer: {
    padding: 15,
    borderRadius: 8,
    // backgroundColor: '#f0f0f0',
  },
  timerText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.MAX,
  },
});

export default RaceHomeScreen;
