import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChangePasswordScreen from '@/screens/admin/ChangePasswordScreen';
import ChangeProfileScreen from '@/screens/admin/ChangeProfileScreen';
import BottomTabsNavigator, {
  BottomTabsParamList,
} from '../bottomTabs/BottomTabsNavigator';
import {loggedInNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type UserDrawerParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  [loggedInNavigations.CHANGE_PASSWORD]: undefined;
  [loggedInNavigations.CHANGE_PROFILE]: undefined;
};

const Drawer = createDrawerNavigator();

function UserDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
      }}
    >
      <Drawer.Screen name="BottomTabs" component={BottomTabsNavigator} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="ChangeProfile" component={ChangeProfileScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});

export default UserDrawerNavigator;
