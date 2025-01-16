import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ResponseRankingData, getRankingData} from '@/api/ranking';
import LoadingScreen from '@/components/LoadingScreen';
import MyTeamInfo from '@/components/ranking/MyTeamInfo';
import TeamRanking from '@/components/ranking/TeamRanking';
import CustomTextRegular from '@/components/styles/CustomTextRegular';
import CustomTextSemiBold from '@/components/styles/CustomTextSemiBold';
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

  const [rankingData, setRankingData] = useState<
    ResponseRankingData['responseDto'] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextSunday = new Date();

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

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRankingData();
        setRankingData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const teams = rankingData?.rankList || [];
  const myTeam = teams[rankingData?.myIndex || 0] || 0;
  const myRank = myTeam.rank;
  const myTeamId = myTeam.departmentId;
  const needExp = rankingData?.needExp || 0;

  const rank1Team = teams.find(team => team.rank === 1);
  const rank2Team = teams.find(team => team.rank === 2);
  const max = rank1Team?.expAvg || 0;
  const nextExp =
    rank1Team && rank2Team ? rank1Team.expAvg - rank2Team.expAvg : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.timeWrapper}>
          <Text style={styles.title}>이번 주 레이스 마감까지</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분{' '}
              {timeLeft.seconds}초
            </Text>
          </View>
        </View>
        <View style={styles.myTeamInfo}>
          <MyTeamInfo myIndex={myRank} needExp={needExp} nextExp={nextExp} />
        </View>
        <View style={styles.rankContainer}>
          <CustomTextSemiBold style={styles.rankingHeaderTitle}>
            실시간 랭킹
          </CustomTextSemiBold>
          <View style={styles.divider} />
          <View style={styles.info}>
            <CustomTextRegular style={styles.infoText}>
              ⓘ 팀별 총 획득량 / 팀원 수 기준
            </CustomTextRegular>
          </View>
          <TeamRanking max={max} myTeamId={myTeamId} teams={teams} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFEC',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  timeWrapper: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '10%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Pretendard-Medium',
    color: '#000',
  },
  timerContainer: {
    paddingBottom: 12,
    paddingTop: 5,
    borderRadius: 8,
  },
  timerText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.MAX,
  },
  myTeamInfo: {
    paddingTop: 25,
  },
  rankContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  rankingHeaderTitle: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 3,
    fontSize: 18,
    color: colors.BLACK,
  },
  divider: {
    marginVertical: 8,
    height: 1.3,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  info: {
    alignItems: 'flex-end',
  },
  infoText: {
    marginBottom: 5,
    fontSize: 13,
    marginRight: 10,
  },
});

export default RaceHomeScreen;
