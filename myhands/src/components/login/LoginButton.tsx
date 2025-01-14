import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {colors} from '@/constants';

interface LoginButtonProps {
  isLoading: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const LoginButton = ({isLoading, onPress}: LoginButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.disabledButton]}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text style={styles.buttonText}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.RED_800,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 16,
    width: '100%',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 19,
    fontFamily: 'Pretendard-Bold',
  },
});

export default LoginButton;
