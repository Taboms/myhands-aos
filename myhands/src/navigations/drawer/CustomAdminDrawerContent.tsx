import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '@/constants';
import {useAuthStore} from '@/store/authStore';

function CustomAdminDrawerContent(props: DrawerContentComponentProps) {
  const adminId = useAuthStore(state => state.adminId);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#FFFFFF', '#FFE4DD']}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          <Text style={styles.name}>관리자</Text>
          <Text style={styles.boldText}>{adminId || 'adminId'}</Text>
        </View>
      </LinearGradient>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

export default CustomAdminDrawerContent;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 0.3,
  },
  container: {
    flex: 0.4,
    marginTop: 12,
    padding: 45,
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 6,
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.GRAY_700,
  },
});
