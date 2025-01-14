import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomTextRegular from '../styles/CustomTextRegular';

interface QuestRecordProps {
  questRate: number;
  maxCount: number;
}

// function QuestRecord({questRate, maxCount}: QuestRecordProps) {
function QuestRecord() {
  const questRate = 91;
  const maxCount = 13;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>퀘스트 달성률</Text>
        <Text style={styles.value}>{questRate}%</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <CustomTextRegular style={styles.label}>
          최장 달성 기간
        </CustomTextRegular>
        <View style={styles.valueContainer}>
          <CustomTextRegular style={styles.value}>
            {maxCount}주
          </CustomTextRegular>
          <CustomTextRegular style={styles.emoji}>🔥</CustomTextRegular>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginTop: 25,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    // borderWidth: 2,
    // borderColor: colors.MAX,
  },
  divider: {
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 36,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 50,
    includeFontPadding: false, // 안드로이드에서 폰트 패딩 제거
    textAlignVertical: 'center', // 안드로이드 텍스트 수직 정렬
  },
  emoji: {
    fontSize: 28,
    lineHeight: 50,
  },
});

export default QuestRecord;
