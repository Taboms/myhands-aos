import React from 'react';
import {Button, Text, View} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {adminNavigations} from '@/constants';
import {AdminStackParamList} from '@/navigations/stack/AdminStackNavigator';

interface AdminHomeScreenProps {
  navigation: BottomTabNavigationProp<AdminStackParamList>;
}

function AdminHomeScreen({navigation}: AdminHomeScreenProps) {
  return (
    <View>
      <Text>Admin Home Screen</Text>
      <Button
        title="Stack Test"
        onPress={() => navigation.navigate(adminNavigations.ADMIN_SIGNUP)}
      />
    </View>
  );
}

export default AdminHomeScreen;
