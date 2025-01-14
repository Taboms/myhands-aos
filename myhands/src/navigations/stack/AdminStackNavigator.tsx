import React from 'react';
import {Pressable} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AdminDrawerNavigator, {
  AdminDrawerParamList,
} from '../drawer/AdminDrawerNavigator';
import {headerIcons} from '@/assets/icons/headerIcons';
import {adminNavigations} from '@/constants/navigations';
import AdminHomeScreen from '@/screens/admin/AdminHomeScreen';
import AdminPostListScreen from '@/screens/admin/AdminPostListScreen';
import AdminSignupScreen from '@/screens/admin/AdminSignupScreen';
import AdminUserListScreen from '@/screens/admin/AdminUserListScreen';
import AdminWritePostScreen from '@/screens/admin/AdminWritePostScreen';

export type AdminStackParamList = {
  AdminDrawer: NavigatorScreenParams<AdminDrawerParamList>;
  [adminNavigations.ADMIN_HOME]: undefined;
  [adminNavigations.ADMIN_SIGNUP]: undefined;
  [adminNavigations.ADMIN_USER_LIST]: undefined;
  [adminNavigations.ADMIN_WRITE_POST]: undefined;
  [adminNavigations.ADMIN_POST_LIST]: undefined;
};

const Stack = createStackNavigator<AdminStackParamList>();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 25}}>
      <SvgXml xml={headerIcons.back} />
    </Pressable>
  );
};

function AdminStackNavigator() {
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
        name="AdminDrawer"
        component={AdminDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={adminNavigations.ADMIN_HOME}
        component={AdminHomeScreen}
        options={{
          title: '관리자 페이지',
        }}
      />
      <Stack.Screen
        name={adminNavigations.ADMIN_SIGNUP}
        component={AdminSignupScreen}
        options={{
          title: '회원 생성',
        }}
      />
      <Stack.Screen
        name={adminNavigations.ADMIN_USER_LIST}
        component={AdminUserListScreen}
        options={{
          title: '회원 목록',
        }}
      />
      <Stack.Screen
        name={adminNavigations.ADMIN_WRITE_POST}
        component={AdminWritePostScreen}
        options={{
          title: '게시글 작성',
        }}
      />
      <Stack.Screen
        name={adminNavigations.ADMIN_POST_LIST}
        component={AdminPostListScreen}
        options={{
          title: '게시판',
        }}
      />
    </Stack.Navigator>
  );
}

export default AdminStackNavigator;
