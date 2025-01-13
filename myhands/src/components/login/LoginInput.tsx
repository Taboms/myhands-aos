import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

interface LoginInputProps extends TextInputProps {
  secureTextEntry?: boolean;
}

const LoginInput = (props: LoginInputProps) => {
  const {
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    editable = true,
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.inputContainer, secureTextEntry && styles.noBorder]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.GRAY_500}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        editable={editable}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={22}
            color={colors.GRAY_500}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 8,
    color: colors.BLACK,
  },
  eyeIcon: {
    position: 'absolute',
    right: 8,
    top: 15,
  },
});

export default LoginInput;
