import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

function CustomUserDrawerContent(props: DrawerContentComponentProps) {
  return (
    <SafeAreaView>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >
        <View>
          <Text>사용자 정보란</Text>
          <Text>최이서</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 1,
    margin: 0,
  },
});

export default CustomUserDrawerContent;
