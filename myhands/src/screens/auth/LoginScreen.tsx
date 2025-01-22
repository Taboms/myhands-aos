import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '@/components/login/Header';
import LoginButton from '@/components/login/LoginButton';
import LoginInput from '@/components/login/LoginInput';
import CustomTextMedium from '@/components/styles/CustomTextMedium';
import {colors} from '@/constants';
import {useAuthStore} from '@/store/authStore';

const LoginScreen = () => {
  const login = useAuthStore(state => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    try {
      setErrorMessage(null);
      const deviceToken = await getFcmToken();
      console.log('로그인 시도 with deviceToken: ', deviceToken);
      await login(id, password, deviceToken);
    } catch (error) {
      setErrorMessage('아이디 또는 비밀번호를 확인해주세요.');
      throw new Error('로그인 실패');
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await handleLogin();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdSubmit = () => {
    passwordInputRef.current?.focus();
  };

  // 비밀번호 입력 완료 시 처리
  const handlePasswordSubmit = () => {
    handleSubmit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Image
        source={require('@/assets/image/board-ellipse.png')}
        style={styles.curveImage}
        resizeMode="stretch"
      />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <LoginInput
            placeholder="아이디"
            value={id}
            onChangeText={setId}
            editable={!isLoading}
            returnKeyType="next"
            onSubmitEditing={handleIdSubmit}
          />
          <LoginInput
            inputRef={passwordInputRef}
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            editable={!isLoading}
            returnKeyType="done"
            onSubmitEditing={handlePasswordSubmit}
          />
        </View>
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Icon
              name="exclamationcircleo"
              size={17}
              color={colors.RED_800}
              style={styles.errorIcon}
            />
            <CustomTextMedium style={styles.errorMessage}>
              {errorMessage}
            </CustomTextMedium>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <LoginButton isLoading={isLoading} onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  curveImage: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    height: 180,
    width: '100%',
    zIndex: 1,
  },
  formContainer: {
    position: 'absolute',
    top: '36%',
    left: 35,
    right: 35,
    zIndex: 2,
  },
  inputContainer: {
    marginBottom: 14,
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  errorIcon: {
    top: 1,
    marginLeft: 3,
    marginRight: 8,
  },
  errorMessage: {
    color: colors.RED_800,
    fontSize: 14,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default LoginScreen;
