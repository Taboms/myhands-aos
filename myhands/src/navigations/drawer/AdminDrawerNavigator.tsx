import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminHomeScreen from '@/screens/admin/AdminHomeScreen';

const Drawer = createDrawerNavigator();

function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        // drawerType: 'front',
        headerShown: false,
      }}
    >
      <Drawer.Screen name="AdminHome" component={AdminHomeScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AdminDrawerNavigator;
