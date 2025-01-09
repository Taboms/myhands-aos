import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChangePasswordScreen from '@/screens/admin/ChangePasswordScreen';
import ChangeProfileScreen from '@/screens/admin/ChangeProfileScreen';
import BottomTabsNavigator, {
  BottomTabsParamList,
} from '../bottomTabs/BottomTabsNavigator';
import {loggedInNavigations} from '@/constants';
import {
  DrawerActions,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';

export type UserDrawerParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  [loggedInNavigations.CHANGE_PASSWORD]: undefined;
  [loggedInNavigations.CHANGE_PROFILE]: undefined;
};

const Drawer = createDrawerNavigator();

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', paddingRight: 15}}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text>Open Drawer</Text>
      </TouchableOpacity>
    </View>
  );
};

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
