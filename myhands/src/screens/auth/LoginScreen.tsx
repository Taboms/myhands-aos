import React from 'react';
import {SafeAreaView, View} from 'react-native';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils/validate';

function LoginScreen() {
  const {loginMutation} = useAuth();

  const login = useForm({
    initialValue: {
      id: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log('values', login.values);
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView>
      {/* <St.Container> */}
      <View>
        {/* // 그라데이션 */}
        {/* <St.Background></St.Background> */}
        {/* <St.LogoImage source={require('@/assets/logo/logo-circle.png')} /> */}
        <InputField
          placeholder="아이디"
          autoFocus={true}
          {...login.getTextInputProps('id')}
        />
        <InputField
          placeholder="비밀번호"
          {...login.getTextInputProps('password')}
        />
        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          onPress={handleSubmit}
        />
      </View>
      {/* <St.BottomWrapper */}
      {/* </St.Container> */}
    </SafeAreaView>
  );
}

export default LoginScreen;
