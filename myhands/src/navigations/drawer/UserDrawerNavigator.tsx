import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomTabsNavigator, {
  BottomTabsParamList,
} from '../bottomTabs/BottomTabsNavigator';
import CustomUserDrawerContent from './CustomUserDrawerContent';
import CustomModal from '@/components/_modal/CustomModal';
import {loggedInNavigations} from '@/constants';
import ChangePasswordScreen from '@/screens/settings/ChangePasswordScreen';
import ChangeProfileScreen from '@/screens/settings/ChangeProfileScreen';
import {useAuthStore} from '@/store/authStore';

export type UserDrawerParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  [loggedInNavigations.CHANGE_PASSWORD]: undefined;
  [loggedInNavigations.CHANGE_PROFILE]: undefined;
  Logout: undefined;
};

const Drawer = createDrawerNavigator();

interface UserDrawerNavigatorProps {
  navigation: DrawerNavigationProp<UserDrawerParamList>;
}

function DrawerIcons({
  route,
  size,
}: {
  route: RouteProp<UserDrawerParamList, keyof UserDrawerParamList>;
  size: number;
}) {
  switch (route.name) {
    case loggedInNavigations.CHANGE_PROFILE:
      return <FontAwesome5 name="user-edit" size={18} color={'#515151'} />;
    case loggedInNavigations.CHANGE_PASSWORD:
      return <MaterialIcons name="password" size={22} color={'#515151'} />;
    case 'Logout':
      return <MaterialIcons name="logout" size={size} color={'#515151'} />;
    default:
      return null;
  }
}

function UserDrawerNavigator({navigation}: UserDrawerNavigatorProps) {
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
        drawerContent={CustomUserDrawerContent}
        initialRouteName="BottomTabs"
        screenOptions={({route}) => ({
          drawerType: 'front',
          drawerStyle: {
            width: Dimensions.get('screen').width * 0.7,
            borderTopRightRadius: 10,
          },
          headerShown: false,
          drawerIcon: ({size}) =>
            DrawerIcons({
              route: route as RouteProp<
                UserDrawerParamList,
                keyof UserDrawerParamList
              >,
              size,
            }),
          drawerItemStyle: {
            paddingLeft: 8,
          },
        })}
      >
        <Drawer.Screen
          name="BottomTabs"
          component={BottomTabsNavigator}
          options={{
            drawerItemStyle: {display: 'none'},
          }}
        />
        <Drawer.Screen
          name="ChangeProfile"
          component={ChangeProfileScreen}
          options={{
            drawerLabel: '프로필 수정',
            drawerLabelStyle: {fontFamily: 'Pretendard-Medium'},
          }}
          listeners={{
            drawerItemPress: e => {
              e.preventDefault();
              navigation.navigate(loggedInNavigations.CHANGE_PROFILE);
            },
          }}
        />
        <Drawer.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            drawerLabel: '비밀번호 변경',
            drawerLabelStyle: {fontFamily: 'Pretendard-Medium'},
          }}
          listeners={{
            drawerItemPress: e => {
              e.preventDefault();
              navigation.navigate(loggedInNavigations.CHANGE_PASSWORD);
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

export default UserDrawerNavigator;
