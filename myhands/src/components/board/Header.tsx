import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextSemiBold from '../styles/CustomTextSemiBold';
import {colors} from '@/constants';

const Header = () => {
  return (
    <LinearGradient
      colors={['#FFF5F3', '#FFD5CB']}
      style={styles.gradientBackground}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <CustomTextSemiBold style={styles.headerText}>
            멈추지 않는 도전,
          </CustomTextSemiBold>
          <Image
            source={require('@/assets/logo/logo-row.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    height: '40%',
    justifyContent: 'flex-end',
  },
  header: {
    height: '75%',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: colors.RED_800,
    fontFamily: 'Pretendard-SemiBold',
  },
  logo: {
    width: 150,
    height: 37.5,
    resizeMode: 'contain',
  },
});

export default Header;
