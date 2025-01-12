import React, {useState} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import {useAuthStore} from '@/store/authStore';
import {validateLogin} from '@/utils/validate';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);

  const form = useForm({
    initialValue: {
      id: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = async () => {
    // 폼 유효성 검사
    setIsLoading(true);
    try {
      console.log('로그인 시도 with: ', form.values.id, form.values.password);
      await login(form.values.id, form.values.password);
      // 로그인 성공 시 RootNavigator에서 자동으로 화면 전환됨
    } catch (error) {
      // 에러 처리
      console.log('로그인 실패', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <InputField
          placeholder="아이디"
          autoFocus={true}
          {...form.getTextInputProps('id')}
          editable={!isLoading}
        />
        <InputField
          placeholder="비밀번호"
          secureTextEntry={true}
          {...form.getTextInputProps('password')}
          editable={!isLoading}
        />
        <CustomButton
          label={isLoading ? '로그인 중...' : '로그인'}
          variant="filled"
          size="large"
          onPress={handleSubmit}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
