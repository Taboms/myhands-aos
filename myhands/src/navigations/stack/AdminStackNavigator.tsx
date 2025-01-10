import React from 'react';
import {Pressable} from 'react-native';
import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdminDrawerNavigator, {
  AdminDrawerParamList,
} from '../drawer/AdminDrawerNavigator';
import {adminNavigations} from '@/constants/navigations';
import AdminHomeScreen from '@/screens/admin/AdminHomeScreen';
import AdminPostListScreen from '@/screens/admin/AdminPostListScreen';
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
      <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
};

function AdminStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
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
        component={AdminHomeScreen}
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
