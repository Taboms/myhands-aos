import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import QuestCalendarScreen from './QuestCalendarScreen';
import QuestStatusScreen from './QuestStatusScreen';
import {QuestResponse} from '@/api/quest';
import {colors} from '@/constants';
import {Quest} from '@/types/domain';

export type QuestTabParamList = {
  QuestAchievement: {
    challengeCount: number;
    resultList: string[];
  };
  QuestHistory: {
    questList: Quest[][];
  };
};

const Tab = createMaterialTopTabNavigator<QuestTabParamList>();

function QuestHomeScreen() {
  // 임시 데이터
  const mockResponse: QuestResponse = {
    status: 'OK',
    message: 'success',
    responseDto: {
      weekCount: 5,
      questList: [
        [
          {
            questId: 1,
            questType: 'job',
            name: '음성 1센터 직무그룹1 1주차',
            grade: 'MED',
            expAmount: 40,
            isCompleted: true,
            completedAt: '2025-01-05T00:00:00',
          },
        ],
        [
          {
            questId: 2,
            questType: 'job',
            name: '음성 1센터 직무그룹1 2주차',
            grade: 'MAX',
            expAmount: 80,
            isCompleted: true,
            completedAt: '2025-01-12T00:00:00',
          },
        ],
        [
          {
            questId: 4,
            questType: 'job',
            name: '음성 1센터 직무그룹1 3주차',
            grade: 'MED',
            expAmount: 40,
            isCompleted: true,
            completedAt: '2025-01-19T00:00:00',
          },
        ],
        [
          {
            questId: 3,
            questType: 'job',
            name: '음성 1센터 직무그룹1 4주차',
            grade: 'MED',
            expAmount: 40,
            isCompleted: true,
            completedAt: '2025-01-26T00:00:00',
          },
        ],
        [
          {
            questId: 14,
            questType: 'hr',
            name: '상반기 인사평가 | 김민수',
            grade: 'B등급',
            expAmount: 3000,
            isCompleted: true,
            completedAt: '2025-01-30T00:00:00',
          },
          {
            questId: 5,
            questType: 'leader',
            name: '1월 월특근 | 김민수',
            grade: 'Max',
            expAmount: 100,
            isCompleted: true,
            completedAt: '2025-01-31T23:59:00',
          },
        ],
      ],
    },
  };

  const questStats = {
    challengeCount: 7,
    resultList: ['MAX', 'MED', 'MED', 'MED', 'B등급', 'Max'],
    questRate: 100,
    maxCount: 2,
    historySize: mockResponse.responseDto.weekCount,
    expHistory: {
      2025: 3300, // 모든 expAmount의 합
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
        initialParams={{
          challengeCount: questStats.challengeCount,
          resultList: questStats.resultList,
        }}
      />
      <Tab.Screen
        name="QuestHistory"
        component={QuestCalendarScreen}
        options={{title: '월별 내역'}}
        initialParams={{
          questList: mockResponse.responseDto.questList,
        }}
      />
    </Tab.Navigator>
  );
}

export default QuestHomeScreen;
