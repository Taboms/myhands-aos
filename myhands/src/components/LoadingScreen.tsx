import React from 'react';
import {View, ActivityIndicator} from 'react-native';

function LoadingScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#FF8366" />
    </View>
  );
}

export default LoadingScreen;
