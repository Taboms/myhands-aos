import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ReturnKeyType,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

interface LoginInputProps extends TextInputProps {
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyType;
  inputRef?: React.RefObject<TextInput>;
}

const LoginInput = (props: LoginInputProps) => {
  const {
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    editable = true,
    onSubmitEditing,
    returnKeyType,
    inputRef,
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.inputContainer, secureTextEntry && styles.noBorder]}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.GRAY_500}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        editable={editable}
        autoCapitalize="none"
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
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
    height: 60,
    // borderColor: '#000',
    // borderWidth: 1,
    marginTop: 1,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 15,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
  },
  eyeIcon: {
    position: 'absolute',
    right: 8,
    top: 15,
  },
});

export default LoginInput;
