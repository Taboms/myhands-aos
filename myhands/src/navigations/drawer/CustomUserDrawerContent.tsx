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
            <View style={styles.textWrapper}>
              <Text style={styles.infoText}>
                사{'   '}번{'  '}
              </Text>
              <Text style={styles.boldText}>
                {user?.employeeNum || '000000'}
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.infoText}>
                소{'   '}속{'  '}
              </Text>
              <Text style={styles.boldText}>
                {user?.department || '부서명'}
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.infoText}>입사일{'  '}</Text>
              <Text style={styles.boldText}>
                {user?.joinedAt || '0000.00.00'}
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.infoText}>
                레{'   '}벨{'   '}
              </Text>
              <Text style={styles.boldText}>{user?.level || 'F1-II'}</Text>
            </View>
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
  gradientBackground: {},
  container: {
    paddingVertical: 35,
    paddingHorizontal: 36,
    justifyContent: 'center',
  },
  avatarContainer: {
    marginTop: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: colors.BLACK,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  infoContainer: {
    width: '100%',
  },
  textWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  infoText: {
    fontSize: 12,
    color: '#676767',
    fontFamily: 'Pretendard-Medium',
    marginRight: 5,
  },
  boldText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: '#5f5f5f',
  },
  nameContainer: {
    marginBottom: 20,
  },
});
