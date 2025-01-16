import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import QuestCalendarScreen from './QuestCalendarScreen';
import QuestStatusScreen from './QuestStatusScreen';
import LoadingScreen from '@/components/LoadingScreen';
import {colors} from '@/constants';
import {useQuestStore} from '@/store/questStore';

export type QuestTabParamList = {
  QuestAchievement: undefined;
  QuestHistory: undefined;
};

const Tab = createMaterialTopTabNavigator<QuestTabParamList>();

function QuestHomeScreen() {
  const {fetchQuestData} = useQuestStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchQuestData();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchQuestData]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.RED_800,
        tabBarInactiveTintColor: '#666',
        tabBarIndicatorStyle: {
          backgroundColor: colors.RED_800,
        },
        tabBarStyle: {
          elevation: 0,
          backgroundColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Pretendard-SemiBold',
          textTransform: 'none',
        },
        tabBarContentContainerStyle: {
          height: 60,
        },
        tabBarIndicatorContainerStyle: {
          borderColor: '#EAEAEA',
          borderBottomWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="QuestAchievement"
        component={QuestStatusScreen}
        options={{title: '달성 통계'}}
      />
      <Tab.Screen
        name="QuestHistory"
        component={QuestCalendarScreen}
        options={{title: '월별 내역'}}
      />
    </Tab.Navigator>
  );
}

export default QuestHomeScreen;
