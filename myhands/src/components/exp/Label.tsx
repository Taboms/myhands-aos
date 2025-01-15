import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomTextRegular from '../styles/CustomTextRegular';
import {colors} from '@/constants';

type LabelProps = {
  type: 'MAX' | 'MED' | '기타';
};

const Label = ({type}: LabelProps) => {
  const labelStyle = getLabelStyle(type);

  return (
    <View style={styles.labelContainer}>
      <View style={[styles.circle, {backgroundColor: labelStyle.color}]} />
      <CustomTextRegular style={styles.labelText}>{type}</CustomTextRegular>
    </View>
  );
};

const getLabelStyle = (type: 'MAX' | 'MED' | '기타') => {
  switch (type) {
    case 'MAX':
      return {color: '#FF5B35'};
    case 'MED':
      return {color: '#FFC300'};
    case '기타':
      return {color: '#56B9FF'};
    default:
      return {color: '#BFBFBF'};
  }
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  labelText: {
    fontSize: 12,
    color: colors.BLACK,
  },
});

export default Label;
