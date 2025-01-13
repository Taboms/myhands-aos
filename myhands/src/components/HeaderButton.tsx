import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

interface HeaderButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const HeaderButton = ({
  label,
  onPress,
  disabled = false,
}: HeaderButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, disabled && styles.disabledButton]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#A9A9A9',
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HeaderButton;
