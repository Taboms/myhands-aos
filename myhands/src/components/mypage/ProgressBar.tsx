import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import CustomTextBold from '../styles/CustomTextBold';

type ProgressBarProps = {
  percentage: number; // 0과 100 사이의 값을 받음
  height: number;
  fontSize: number;
};

const ProgressBar = ({percentage, height, fontSize}: ProgressBarProps) => {
  const progress = percentage / 100; // percentage 값을 0과 1 사이로 변환

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={height}
          color="#FF6C4A"
          unfilledColor="#FFB4A3"
          borderRadius={8}
          borderWidth={0}
          style={styles.progressBar}
        />
        <CustomTextBold style={[styles.percentage, {fontSize}]}>
          {percentage}%
        </CustomTextBold>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
  },
  progressBar: {
    width: '100%',
  },
  percentage: {
    position: 'absolute',
    top: -2,
    left: '46%',
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default ProgressBar;
