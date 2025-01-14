import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import CustomTextSemiBold from '@/components/styles/CustomTextSemiBold';
import {colors} from '@/constants';

interface HeaderButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}

const HeaderButton = ({
  label,
  onPress,
  disabled = false,
  color = colors.GRAY_500,
}: HeaderButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, {backgroundColor: disabled ? '#D3D3D3' : color}]}
      disabled={disabled}
    >
      <CustomTextSemiBold style={styles.buttonText}>{label}</CustomTextSemiBold>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: colors.GRAY_500,
    borderRadius: 16,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    top: -0.5,
    color: 'white',
    fontSize: 17,
  },
});

export default HeaderButton;
