import {StyleSheet, Text} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as St from './CustomUserDrawerContent.style';

function CustomUserDrawerContent(props: DrawerContentComponentProps) {
  return (
    <St.Container>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >
        <St.UserInfoContainer>
          <Text>사용자 정보란</Text>
          <St.NameText>최이서</St.NameText>
        </St.UserInfoContainer>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </St.Container>
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
