import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomTabsNavigator from '../bottomTabs/BottomTabsNavigator';
import CustomModal from '@/components/_modal/CustomModal';
import {adminNavigations} from '@/constants';
import CustomAdminDrawerContent from '@/navigations/drawer/CustomAdminDrawerContent';
import AdminHomeScreen from '@/screens/admin/AdminHomeScreen';
import ChangePasswordScreen from '@/screens/settings/ChangePasswordScreen';
import {useAuthStore} from '@/store/authStore';

export type AdminDrawerParamList = {
  [adminNavigations.ADMIN_HOME]: undefined;
  Logout: undefined;
};

const Drawer = createDrawerNavigator();

interface AdminDrawerNavigatorProps {
  navigation: DrawerNavigationProp<AdminDrawerParamList>;
}

function DrawerIcons({
  route,
  size,
}: {
  route: RouteProp<AdminDrawerParamList, keyof AdminDrawerParamList>;
  size: number;
}) {
  switch (route.name) {
    case adminNavigations.ADMIN_HOME:
      return <AntDesign name="home" size={size} />;
    default:
      return <MaterialIcons name="logout" size={size} />;
  }
}

function AdminDrawerNavigator({navigation}: AdminDrawerNavigatorProps) {
  const logout = useAuthStore(state => state.logout);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <>
      <Drawer.Navigator
        drawerContent={CustomAdminDrawerContent}
        initialRouteName={adminNavigations.ADMIN_HOME}
        screenOptions={({route}) => ({
          drawerType: 'front',
          drawerStyle: {
            width: Dimensions.get('screen').width * 0.7,
          },
          headerShown: true,
          drawerIcon: ({size}) =>
            DrawerIcons({
              route: route as RouteProp<
                AdminDrawerParamList,
                keyof AdminDrawerParamList
              >,
              size,
            }),
        })}
      >
        <Drawer.Screen
          name={adminNavigations.ADMIN_HOME}
          component={AdminHomeScreen}
          options={{drawerLabel: '메인 화면으로'}}
          listeners={{
            drawerItemPress: e => {
              e.preventDefault();
              navigation.navigate(adminNavigations.ADMIN_HOME);
            },
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={ChangePasswordScreen}
          options={{drawerLabel: '로그아웃'}}
          listeners={{
            drawerItemPress: e => {
              e.preventDefault();
              setModalOpen(true);
            },
          }}
        />
      </Drawer.Navigator>
      <CustomModal
        state="Logout"
        type="logout"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onButtonClick={handleLogout}
      />
    </>
  );
}

export default AdminDrawerNavigator;
