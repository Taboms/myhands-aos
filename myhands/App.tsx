import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigations/root/RootNavigator';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
