import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';
import BottomTabsNavigator, {
  BottomTabsParamList,
} from '../bottomTabs/BottomTabsNavigator';
import {loggedInNavigations} from '@/constants';
import ChangePasswordScreen from '@/screens/settings/ChangePasswordScreen';
import ChangeProfileScreen from '@/screens/settings/ChangeProfileScreen';

export type UserDrawerParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  [loggedInNavigations.CHANGE_PASSWORD]: undefined;
  [loggedInNavigations.CHANGE_PROFILE]: undefined;
};

const Drawer = createDrawerNavigator();

interface UserDrawerNavigatorProps {
  navigation: DrawerNavigationProp<UserDrawerParamList>;
}

function UserDrawerNavigator({navigation}: UserDrawerNavigatorProps) {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabsNavigator}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{drawerLabel: '비밀번호 변경'}}
        listeners={{
          drawerItemPress: e => {
            e.preventDefault();
            navigation.navigate(loggedInNavigations.CHANGE_PASSWORD);
          },
        }}
      />
      <Drawer.Screen
        name="ChangeProfile"
        component={ChangeProfileScreen}
        options={{drawerLabel: '프로필 수정'}}
        listeners={{
          drawerItemPress: e => {
            e.preventDefault();
            navigation.navigate(loggedInNavigations.CHANGE_PROFILE);
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default UserDrawerNavigator;
