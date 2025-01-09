import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {loggedOutNavigations} from '@/constants/navigations';
import LoginScreen from '@/screens/auth/LoginScreen';

export type LoggedOutStackParamList = {
  [loggedOutNavigations.LOGIN]: undefined;
};

function LoggedOutStackNavigator() {
  const Stack = createStackNavigator<LoggedOutStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name={loggedOutNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default LoggedOutStackNavigator;
