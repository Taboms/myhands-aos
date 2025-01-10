import React from 'react';
import {Pressable} from 'react-native';
import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserDrawerNavigator, {
  UserDrawerParamList,
} from '../drawer/UserDrawerNavigator';
import {loggedInNavigations} from '@/constants/navigations';
import BoardDetailScreen from '@/screens/board/BoardDetailScreen';
import NotificationsScreen from '@/screens/notifications/NotificationsScreen';
import ChangePasswordScreen from '@/screens/settings/ChangePasswordScreen';
import ChangeProfileScreen from '@/screens/settings/ChangeProfileScreen';

export type LoggedInStackParamList = {
  UserDrawer: NavigatorScreenParams<UserDrawerParamList>;
  [loggedInNavigations.BOARD_DETAIL]: undefined;
  [loggedInNavigations.CHANGE_PASSWORD]: undefined;
  [loggedInNavigations.CHANGE_PROFILE]: undefined;
  [loggedInNavigations.NOTIFICATIONS]: undefined;
};

const Stack = createStackNavigator<LoggedInStackParamList>();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 25}}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
};

function LoggedInStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => BackButton(),
      }}
    >
      <Stack.Screen
        name="UserDrawer"
        component={UserDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={loggedInNavigations.BOARD_DETAIL}
        component={BoardDetailScreen}
        options={{
          title: '게시글 상세',
        }}
      />
      <Stack.Screen
        name={loggedInNavigations.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
        options={{
          title: '비밀번호 변경',
        }}
      />
      <Stack.Screen
        name={loggedInNavigations.CHANGE_PROFILE}
        component={ChangeProfileScreen}
        options={{
          title: '프로필 변경',
        }}
      />
      <Stack.Screen
        name={loggedInNavigations.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          title: '알림함',
        }}
      />
    </Stack.Navigator>
  );
}

export default LoggedInStackNavigator;
