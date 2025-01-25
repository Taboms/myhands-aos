import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomTextBold from '../../styles/CustomTextBold';
import CustomTextSemiBold from '../../styles/CustomTextSemiBold';
import {useQuestStore} from '@/store/questStore';

function QuestRecord() {
  const questRate = useQuestStore(state => state.questStats?.questRate ?? 0);
  const maxCount = useQuestStore(state => state.questStats?.maxCount ?? 0);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <CustomTextSemiBold style={styles.label}>
          퀘스트 달성률
        </CustomTextSemiBold>
        <CustomTextBold style={styles.value}>{questRate}%</CustomTextBold>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <CustomTextSemiBold style={styles.label}>
          최장 달성 기간
        </CustomTextSemiBold>
        <View style={styles.valueContainer}>
          <CustomTextSemiBold style={styles.value}>
            {maxCount}주
          </CustomTextSemiBold>
          <CustomTextSemiBold style={styles.emoji}>🔥</CustomTextSemiBold>
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
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  emoji: {
    fontSize: 28,
    lineHeight: 50,
  },
});

export default QuestRecord;
