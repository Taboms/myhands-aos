import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {getMypageData, ResponseMypageData} from '@/api/mypage';
import LoadingScreen from '@/components/LoadingScreen';
import ExperienceStatus from '@/components/mypage/ExperienceStatus';
import Profile from '@/components/mypage/Profile';
import {colors} from '@/constants';

function MypageHomeScreen() {
  const [mypageData, setMypageData] = useState<
    ResponseMypageData['responseDto'] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMypageData();
        setMypageData(data);
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        {mypageData && (
          <Profile
            fortune={mypageData.fortune}
            levelRate={mypageData.levelRate}
          />
        )}
      </View>

      <View style={styles.expContainer}>
        {mypageData && (
          <ExperienceStatus
            recentExp={mypageData.recentExp}
            thisYearExp={mypageData.thisYearExp}
            lastYearExp={mypageData.lastYearExp}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.45,
    padding: 30,
    backgroundColor: '#FFF4F4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 35,
  },
  expContainer: {
    flex: 0.55,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
  },
});

export default MypageHomeScreen;
