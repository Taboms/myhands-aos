import React, {useState, useLayoutEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {logout} from '@/api/auth';
import {changePassword} from '@/api/setting';
import CustomModal from '@/components/_modal/CustomModal';
import Condition from '@/components/changePassword/Condition';
import ErrorMessage from '@/components/changePassword/ErrorMessage';
import HeaderButton from '@/components/changePassword/HeaderButton';
import PasswordInput from '@/components/changePassword/PasswordInput';
import CustomTextMedium from '@/components/styles/CustomTextMedium';
import {colors} from '@/constants';
import {useAuthStore} from '@/store/authStore';

const ChangePasswordScreen = ({navigation}: any) => {
  const currentPasswordFromStore = useAuthStore(state => state.password);
  const userLogout = useAuthStore(state => state.logout);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const isButtonEnabled = useCallback(() => {
    return (
      currentPassword.length > 0 &&
      currentPassword === currentPasswordFromStore &&
      checkNewPasswordConditions().lengthCondition &&
      checkNewPasswordConditions().containsAll &&
      isPasswordMatched
    );
  }, [currentPassword, newPassword, confirmPassword, isPasswordMatched]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
    } finally {
      userLogout();
    }
  };

  const handlePasswordChange = async () => {
    if (!isPasswordMatched || !checkNewPasswordConditions().containsAll) {
      return;
    }

    try {
      await changePassword(newPassword);
      setIsModalOpen(false);
      await handleLogout();
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderButton
          label="변경"
          onPress={() => setIsModalOpen(true)}
          disabled={!isButtonEnabled()} // 버튼 활성화/비활성화
        />
      ),
    });
  }, [navigation, isButtonEnabled]);

  return (
    <View style={styles.container}>
      <CustomTextMedium style={styles.label}>현재 비밀번호</CustomTextMedium>
      <PasswordInput
        placeholder="현재 비밀번호를 입력하세요"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        onBlur={handleCurrentPasswordValidation}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <CustomTextMedium style={styles.label}>새 비밀번호</CustomTextMedium>
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

      <CustomTextMedium style={styles.label}>새 비밀번호 확인</CustomTextMedium>
      <PasswordInput
        placeholder="새 비밀번호를 다시 입력하세요"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.conditionsContainer}>
        <Condition isValid={isPasswordMatched} text="비밀번호 일치" />
      </View>

      <CustomModal
        state="PasswordChangeWarning"
        type="warning"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onButtonClick={handlePasswordChange}
      />
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
