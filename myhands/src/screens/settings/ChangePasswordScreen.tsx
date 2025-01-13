import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Condition from '@/components/changePassword/Condition';
import ErrorMessage from '@/components/changePassword/ErrorMessage';
import PasswordInput from '@/components/changePassword/PasswordInput';
import {colors} from '@/constants';
import {useAuthStore} from '@/store/authStore';

const ChangePasswordScreen = () => {
  const currentPasswordFromStore = useAuthStore(state => state.password);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkNewPasswordConditions = () => {
    const lengthCondition = newPassword.length >= 8 && newPassword.length <= 20;
    const containsLetter = /[a-zA-Z]/.test(newPassword);
    const containsNumber = /\d/.test(newPassword);
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    return {
      lengthCondition,
      containsAll: containsLetter && containsNumber && containsSpecialChar,
    };
  };

  const handleCurrentPasswordValidation = () => {
    if (currentPassword !== currentPasswordFromStore) {
      setErrorMessage('입력하신 정보가 일치하지 않습니다.');
    } else {
      setErrorMessage(null);
    }
  };

  const isPasswordMatched =
    confirmPassword === newPassword && newPassword.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>현재 비밀번호</Text>
      <PasswordInput
        placeholder="현재 비밀번호를 입력하세요"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        onBlur={handleCurrentPasswordValidation} // 입력 필드가 벗어날 때 유효성 검사
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <Text style={styles.label}>새 비밀번호</Text>
      <PasswordInput
        placeholder="새 비밀번호를 입력하세요"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <View style={styles.conditionsContainer}>
        <Condition
          isValid={checkNewPasswordConditions().lengthCondition}
          text="8-20자 이내"
        />
        <Condition
          isValid={checkNewPasswordConditions().containsAll}
          text="영문자, 숫자, 특수문자 포함"
        />
      </View>

      <Text style={styles.label}>새 비밀번호 확인</Text>
      <PasswordInput
        placeholder="새 비밀번호를 다시 입력하세요"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.conditionsContainer}>
        <Condition isValid={isPasswordMatched} text="비밀번호 일치" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  conditionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
});

export default ChangePasswordScreen;
