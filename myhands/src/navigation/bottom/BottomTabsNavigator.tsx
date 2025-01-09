import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@/constants';
import {loggedInNavigations} from '@/constants/navigations';
import BoardHomeScreen from '@/screens/board/BoardHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MessengerHomeScreen from '@/screens/messenger/MessengerHomeScreen';
import MypageHomeScreen from '@/screens/mypage/MypageHomeScreen';

export type BottomTabsParamList = {
  [loggedInNavigations.BOARD_HOME]: undefined;
  [loggedInNavigations.CALENDAR_HOME]: undefined;
  [loggedInNavigations.MESSENGER_HOME]: undefined;
  [loggedInNavigations.MYPAGE_HOME]: undefined;
};

const renderTabIcon =
  (name: string, font: string) =>
  ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
    const iconColor = focused ? colors.RED_800 : color;
    return font === 'MaterialIcons' ? (
      <Icon name={name} color={iconColor} size={size} />
    ) : (
      <Ionicons name={name} color={iconColor} size={size} />
    );
  };

function BottomTabsNavigator() {
  const Tab = createBottomTabNavigator<BottomTabsParamList>();

  return (
    <Tab.Navigator
      initialRouteName={loggedInNavigations.MYPAGE_HOME}
      screenOptions={{
        tabBarActiveTintColor: colors.RED_800,
        tabBarInactiveTintColor: colors.GRAY_500,
      }}
    >
      <Tab.Screen
        name={loggedInNavigations.CALENDAR_HOME}
        component={CalendarHomeScreen}
        options={{
          title: '일정',
          tabBarIcon: renderTabIcon('calendar-month', 'MaterialIcons'),
        }}
      />
      <Tab.Screen
        name={loggedInNavigations.MESSENGER_HOME}
        component={MessengerHomeScreen}
        options={{
          title: '메신저',
          tabBarIcon: renderTabIcon('chatbox-ellipses-outline', 'Ionicons'),
        }}
      />
      <Tab.Screen
        name={loggedInNavigations.BOARD_HOME}
        component={BoardHomeScreen}
        options={{
          title: '게시판',
          tabBarIcon: renderTabIcon('clipboard-check-outline', 'MaterialIcons'),
        }}
      />
      <Tab.Screen
        name={loggedInNavigations.MYPAGE_HOME}
        component={MypageHomeScreen}
        options={{
          title: 'MY',
          tabBarIcon: renderTabIcon('person-circle-sharp', 'Ionicons'),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
