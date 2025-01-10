import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {adminNavigations} from '@/constants';
import AdminHomeScreen from '@/screens/admin/AdminHomeScreen';
import ChangeProfileScreen from '@/screens/settings/ChangeProfileScreen';

export type AdminDrawerParamList = {
  [adminNavigations.ADMIN_HOME]: undefined;
};

const Drawer = createDrawerNavigator();

function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={adminNavigations.ADMIN_HOME}
      screenOptions={{
        drawerType: 'front',
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen
        name={adminNavigations.ADMIN_HOME}
        component={AdminHomeScreen}
        options={{drawerLabel: '메인 화면으로'}}
      />
      <Drawer.Screen
        name="logout"
        component={ChangeProfileScreen}
        options={{drawerLabel: '로그아웃'}}
      />
    </Drawer.Navigator>
  );
}

export default AdminDrawerNavigator;
