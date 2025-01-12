import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BoardAllScreen = () => {
  return (
    <View style={styles.container}>
      <Text>전체 게시글 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BoardAllScreen;
