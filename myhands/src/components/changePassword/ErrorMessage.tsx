import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import CustomTextMedium from '../styles/CustomTextMedium';
import {colors} from '@/constants';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({message}: ErrorMessageProps) => (
  <View style={styles.errorContainer}>
    <IconAntDesign
      name="exclamationcircleo"
      size={16}
      color={colors.RED_800}
      style={styles.icon}
    />
    <CustomTextMedium style={styles.errorMessage}>{message}</CustomTextMedium>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorMessage: {
    color: colors.RED_800,
    fontSize: 14,
    marginLeft: 8,
  },
  icon: {
    top: 1,
    marginLeft: 2,
  },
});

export default ErrorMessage;
