import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {adminNavigations} from '@/constants';
import AdminHomeScreen from '@/screens/admin/AdminHomeScreen';
import ChangeProfileScreen from '@/screens/settings/ChangeProfileScreen';
import {useAuthStore} from '@/store/authStore';

export type AdminDrawerParamList = {
  [adminNavigations.ADMIN_HOME]: undefined;
};

const Drawer = createDrawerNavigator();

function AdminDrawerNavigator() {
  const logout = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

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
        listeners={{
          drawerItemPress: e => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default AdminDrawerNavigator;
