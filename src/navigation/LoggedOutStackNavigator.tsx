import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {loggedOutNavigations} from '@/constants/navigations';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';

function LoggedOutStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={loggedOutNavigations.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen name={loggedOutNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default LoggedOutStackNavigator;
