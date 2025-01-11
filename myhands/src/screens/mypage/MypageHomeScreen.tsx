import React from 'react';
import {Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';

function MypageHomeScreen() {
  const {getProfileQuery} = useAuth();

  return (
    <View>
      <Text>Mypage Home Screen</Text>
    </View>
  );
}

export default MypageHomeScreen;
