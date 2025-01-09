import React from 'react';
import {Button, Text, View} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {loggedInNavigations} from '@/constants';
import {LoggedInStackParamList} from '@/navigation/stack/LoggedInStackNavigator';

interface BoardHomeScreenProps {
  navigation: BottomTabNavigationProp<LoggedInStackParamList, 'BottomTabs'>;
}

function BoardHomeScreen({navigation}: BoardHomeScreenProps) {
  return (
    <View>
      <Text>Board Home Screen</Text>
      <Button
        title="Stack Test"
        onPress={() => navigation.navigate(loggedInNavigations.BOARD_DETAIL)}
      />
    </View>
  );
}

export default BoardHomeScreen;
