import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoggedInStackNavigator from '@/navigation/LoggedInStackNavigator';
import LoggedOutStackNavigator from '@/navigation/LoggedOutStackNavigator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <LoggedInStackNavigator /> : <LoggedOutStackNavigator />}
    </NavigationContainer>
  );
}

export default App;
