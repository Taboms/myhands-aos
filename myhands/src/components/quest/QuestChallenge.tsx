import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import CustomTextBold from '../styles/CustomTextBold';
import CustomTextMedium from '../styles/CustomTextMedium';
import WeeklyTimeline from './WeeklyTimeline';
import {colors} from '@/constants';

function QuestChallenge() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.challengeInfo}>
        <View style={styles.info}>
          <CustomTextMedium style={styles.infoText}>
            현재 이서님은
          </CustomTextMedium>
          <View style={styles.bottomInfoText}>
            <CustomTextBold style={styles.pointText}>3주</CustomTextBold>
            <CustomTextMedium style={styles.bottomText}>
              연속 도전 중 💪
            </CustomTextMedium>
          </View>
        </View>
        <View style={styles.infoStandard}>
          <View style={styles.standard}>
            <View style={[styles.colorBox, {backgroundColor: colors.MAX}]} />
            <Text style={styles.standardText}>MAX</Text>
          </View>
          <View style={styles.standard}>
            <View style={[styles.colorBox, {backgroundColor: colors.MED}]} />
            <Text style={styles.standardText}>MED</Text>
          </View>
          <View style={styles.standard}>
            <View style={[styles.colorBox, {backgroundColor: colors.ETC}]} />
            <Text style={styles.standardText}>기타</Text>
          </View>
        </View>
      </View>
      <WeeklyTimeline />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '7%',
    paddingVertical: '6%',
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 20,
  },
  challengeInfo: {
    flexDirection: 'row',
  },
  info: {},
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    color: 'black',
  },
  bottomInfoText: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bottomText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    color: 'black',
  },
  pointText: {
    color: '#ff5b35',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
    marginRight: 5,
  },
  infoStandard: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 'auto',
    marginTop: 2,
  },
  standard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 16,
  },
  colorBox: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
  standardText: {
    marginLeft: 5,
    fontSize: 10,
    color: 'black',
  },
  challengeRecord: {},
});

export default QuestChallenge;
