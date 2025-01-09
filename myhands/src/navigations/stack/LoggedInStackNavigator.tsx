import React from 'react';
import {
  DrawerActions,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabsParamList} from '../bottomTabs/BottomTabsNavigator';
import {loggedInNavigations} from '@/constants/navigations';
import BoardDetailScreen from '@/screens/board/BoardDetailScreen';
import UserDrawerNavigator, {
  UserDrawerParamList,
} from '../drawer/UserDrawerNavigator';
import {Button, Text, TouchableOpacity, View} from 'react-native';

export type LoggedInStackParamList = {
  UserDrawer: NavigatorScreenParams<UserDrawerParamList>;
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  [loggedInNavigations.BOARD_DETAIL]: undefined;
};

const Stack = createStackNavigator<LoggedInStackParamList>();

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', paddingRight: 15}}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text>Open</Text>
      </TouchableOpacity>
    </View>
  );
};

function LoggedInStackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="BottomTabs"
        component={BottomTabsNavigator}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="UserDrawer"
        component={UserDrawerNavigator}
        options={{
          headerLeft: HeaderRight,
        }}
      />
      <Stack.Screen
        name={loggedInNavigations.BOARD_DETAIL}
        component={BoardDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default LoggedInStackNavigator;
