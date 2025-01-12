import {StyleSheet, Text} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as St from './CustomUserDrawerContent.style';
import {useAuthStore} from '@/store/authStore';

function CustomUserDrawerContent(props: DrawerContentComponentProps) {
  const {user} = useAuthStore();

  return (
    <St.Container>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >
        <St.UserInfoContainer>
          <Text>사용자 정보란</Text>
          <St.NameText>{user?.name}</St.NameText>
          <St.NameText>{user?.id}</St.NameText>
          <St.NameText>{user?.employeeNum}</St.NameText>
          <St.NameText>{user?.department}</St.NameText>
          <St.NameText>{user?.joinedAt}</St.NameText>
          <St.NameText>{user?.level}</St.NameText>
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
