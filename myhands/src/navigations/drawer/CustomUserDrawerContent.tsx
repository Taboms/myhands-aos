import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '@/constants';
import {characterImages} from '@/constants/character';
import {useAuthStore} from '@/store/authStore';

function CustomUserDrawerContent(props: DrawerContentComponentProps) {
  const user = useAuthStore(state => state.user);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#FFFFFF', '#FFE4DD']}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image
              source={characterImages[user?.avartaId || 1]}
              style={styles.avatar}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user?.name || '사용자 이름'}</Text>
            <Text style={styles.boldText}>{user?.id || 'username'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              사{'   '}번{'  '}
              <Text style={styles.boldText}>
                {user?.employeeNum || '000000'}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              소{'   '}속{'  '}
              <Text style={styles.boldText}>
                {user?.department || '부서명'}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              입사일{'  '}
              <Text style={styles.boldText}>
                {user?.joinedAt || '0000.00.00'}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              레{'   '}벨{'   '}
              <Text style={styles.boldText}>{user?.level || 'F1-II'}</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

export default CustomUserDrawerContent;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 0.65,
  },
  container: {
    flex: 0.4,
    paddingVertical: 36,
    paddingHorizontal: 36,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.BLACK,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginBottom: 4,
  },
  infoContainer: {
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    color: colors.GRAY_700,
    marginBottom: 6,
    fontFamily: 'Pretendard-Medium',
  },
  boldText: {
    fontFamily: 'Pretendard-SemiBold',
    color: colors.GRAY_700,
  },
  nameContainer: {
    marginBottom: 16,
  },
});
