import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Header = () => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFD5CB']}
      style={styles.gradientBackground}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/logo/logo-circle.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    height: '50%',
    justifyContent: 'flex-end',
  },
  header: {
    height: '65%',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
});

export default Header;
