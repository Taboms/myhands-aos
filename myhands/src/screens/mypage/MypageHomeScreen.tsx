import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getMypageData, ResponseMypageData} from '@/api/mypage';
import LoadingScreen from '@/components/LoadingScreen';
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
    <View style={styles.container}>
      {/* 상단 프로필 영역 */}
      <View style={styles.profileContainer}>
        {mypageData && (
          <Profile
            fortune={mypageData.fortune}
            levelRate={mypageData.levelRate}
          />
        )}
      </View>

      {/* 하단 경험치 및 기타 정보 */}
      <View style={styles.expContainer}>
        {mypageData && (
          <>
            <Text>Experience: {mypageData.levelRate.currentExp}</Text>
            <Text>Next Level: {mypageData.levelRate.nextLevel}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 차지
  },
  profileContainer: {
    flex: 0.45, // 상단이 화면의 45% 차지
    padding: 20,
    backgroundColor: '#FFF4F4',
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
  },
  expContainer: {
    flex: 0.55, // 하단이 화면의 55% 차지
    padding: 20,
    backgroundColor: colors.WHITE,
  },
});

export default MypageHomeScreen;
