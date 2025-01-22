import {StyleSheet, SafeAreaView, View} from 'react-native';
import CustomTextBold from '../../styles/CustomTextBold';
import CustomTextMedium from '../../styles/CustomTextMedium';
import CustomTextSemiBold from '../../styles/CustomTextSemiBold';
import WeeklyTimeline from './WeeklyTimeline';
import {colors} from '@/constants';
import {useAuthStore} from '@/store/authStore';
import {useQuestStore} from '@/store/questStore';

function QuestChallenge() {
  const challengeCount = useQuestStore(
    state => state.questStats?.challengeCount ?? 0
  );

  const userName = useAuthStore(state => state.user?.name ?? '두핸즈');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.challengeInfo}>
        <View style={styles.info}>
          <CustomTextSemiBold style={styles.infoText}>
            현재 {userName}님은
          </CustomTextSemiBold>
          <View style={styles.bottomInfoText}>
            <CustomTextBold style={styles.pointText}>
              {challengeCount}주
            </CustomTextBold>
            <CustomTextSemiBold style={styles.bottomText}>
              연속 도전 중 💪
            </CustomTextSemiBold>
          </View>
        </View>
        <View style={styles.infoStandard}>
          <View style={styles.standard}>
            <View style={[styles.colorBox, {backgroundColor: colors.MAX}]} />
            <CustomTextMedium style={styles.standardText}>MAX</CustomTextMedium>
          </View>
          <View style={styles.standard}>
            <View style={[styles.colorBox, {backgroundColor: colors.MED}]} />
            <CustomTextMedium style={styles.standardText}>MED</CustomTextMedium>
          </View>
          <View style={styles.standard}>
            <View style={[styles.colorBox, {backgroundColor: colors.ETC}]} />
            <CustomTextMedium style={styles.standardText}>
              기타
            </CustomTextMedium>
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
    paddingHorizontal: '8%',
    paddingVertical: '7%',
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 20,
  },
  challengeInfo: {
    flexDirection: 'row',
  },
  info: {},
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: 'black',
  },
  bottomInfoText: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bottomText: {
    fontSize: 15,
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
    height: 17.5,
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
