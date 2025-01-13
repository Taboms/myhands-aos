import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';

interface ConditionProps {
  isValid: boolean;
  text: string;
}

const Condition = ({isValid, text}: ConditionProps) => (
  <View style={styles.conditionWrapper}>
    <IconFeather
      name="check"
      size={16}
      color={isValid ? '#28A745' : '#A0A0A0'}
      style={styles.icon}
    />
    <Text
      style={[styles.conditionText, {color: isValid ? '#28A745' : '#A0A0A0'}]}
    >
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  conditionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  conditionText: {
    fontSize: 14,
    marginLeft: 8,
  },
  icon: {
    top: 2,
  },
});

export default Condition;
