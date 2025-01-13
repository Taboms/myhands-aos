import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import QuestCalendarScreen from './QuestCalendarScreen';
import QuestStatusScreen, {QuestTabParamList} from './QuestStatusScreen';
import {colors} from '@/constants';
import {useQuestStore} from '@/store/questStore';

const Tab = createMaterialTopTabNavigator<QuestTabParamList>();

function QuestHomeScreen() {
  // 통신 연결
  // const {questStats} = useQuestStore();
  const questStats = {
    challengeCount: 3,
    resultList: ['MAX', 'MAX', 'MED'],
    questRate: 91,
    maxCount: 13,
    historySize: 4,
    expHistory: {
      2023: 12000,
      2022: 10000,
      2021: 7000,
      2020: 7000,
    },
  };

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
          fontWeight: 'bold',
          textTransform: 'none',
        },
        tabBarItemStyle: {
          // width: 'auto',
        },
        tabBarContentContainerStyle: {
          height: 55,
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
        initialParams={{
          challengeCount: questStats.challengeCount,
          resultList: questStats.resultList,
        }}
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
