import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
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
    <Text style={styles.errorMessage}>{message}</Text>
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
    top: 2,
    marginLeft: 2,
  },
});

export default ErrorMessage;
