import React from 'react';
import {Button, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loggedOutNavigations} from '@/constants';

// 테스트 스크린, 추후 삭제
function AuthHomeScreen({navigation}: any) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate(loggedOutNavigations.LOGIN)}
        />
      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
