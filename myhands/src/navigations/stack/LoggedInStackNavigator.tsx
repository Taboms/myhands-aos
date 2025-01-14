import React from 'react';
import {Pressable} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserDrawerNavigator, {
  UserDrawerParamList,
} from '../drawer/UserDrawerNavigator';
import {headerIcons} from '@/assets/icons/headerIcons';
import {loggedInNavigations} from '@/constants/navigations';
import BoardAllScreen from '@/screens/board/BoardAllScreen';
import BoardDetailScreen from '@/screens/board/BoardDetailScreen';
import ExpAllScreen from '@/screens/mypage/ExpAllScreen';
import NotificationsScreen from '@/screens/notifications/NotificationsScreen';
import ChangePasswordScreen from '@/screens/settings/ChangePasswordScreen';
import ChangeProfileScreen from '@/screens/settings/ChangeProfileScreen';

export type LoggedInStackParamList = {
  UserDrawer: NavigatorScreenParams<UserDrawerParamList>;
  [loggedInNavigations.BOARD_ALL]: undefined;
  [loggedInNavigations.BOARD_DETAIL]: {postId: number};
  [loggedInNavigations.CHANGE_PASSWORD]: undefined;
  [loggedInNavigations.CHANGE_PROFILE]: undefined;
  [loggedInNavigations.NOTIFICATIONS]: undefined;
  [loggedInNavigations.EXP_ALL]: undefined;
};

const Stack = createStackNavigator<LoggedInStackParamList>();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 25}}>
      <SvgXml xml={headerIcons.back} />
    </Pressable>
  );
};

function LoggedInStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Pretendard-Medium',
          fontSize: 17,
        },
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
        name={loggedInNavigations.BOARD_ALL}
        component={BoardAllScreen}
        options={{
          title: '게시판',
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
        name={loggedInNavigations.EXP_ALL}
        component={ExpAllScreen}
        options={{
          title: '경험치 목록',
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
