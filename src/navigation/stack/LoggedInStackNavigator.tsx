import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabsNavigator, {
  BottomTabsParamList,
} from '../bottom/BottomTabsNavigator';
import {loggedInNavigations} from '@/constants/navigations';
import BoardDetailScreen from '@/screens/board/BoardDetailScreen';

export type LoggedInStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  [loggedInNavigations.BOARD_DETAIL]: undefined;
};

function LoggedInStackNavigator() {
  const Stack = createStackNavigator<LoggedInStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={loggedInNavigations.BOARD_DETAIL}
        component={BoardDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default LoggedInStackNavigator;
