import React, {useState} from 'react';
import {Dimensions, Pressable} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  DrawerActions,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomTabsNavigator from '../bottomTabs/BottomTabsNavigator';
import {headerIcons} from '@/assets/icons/headerIcons';
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
      return <AntDesign name="home" size={size} color={'#515151'} />;
    default:
      return <MaterialIcons name="logout" size={size} color={'#515151'} />;
  }
}

const renderDrawerIcon = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
}) => (
  <Pressable
    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    style={{marginLeft: 30}}
  >
    <SvgXml xml={headerIcons.drawer} />
  </Pressable>
);

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
        screenOptions={({navigation: nav, route}) => ({
          headerLeft: () => renderDrawerIcon({navigation: nav}),
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
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: 17,
          },
        })}
      >
        <Drawer.Screen
          name={adminNavigations.ADMIN_HOME}
          component={AdminHomeScreen}
          options={{
            drawerLabel: '메인 화면으로',
            drawerLabelStyle: {fontFamily: 'Pretendard-Medium'},
            title: '관리자 페이지',
          }}
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
          options={{
            drawerLabel: '로그아웃',
            drawerLabelStyle: {fontFamily: 'Pretendard-Medium'},
          }}
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
