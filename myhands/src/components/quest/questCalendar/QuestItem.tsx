import {View, Text, StyleSheet} from 'react-native';
import {Quest} from '@/types/domain';
import {getGradeColor} from '@/utils/quest';

type QuestItemProps = {
  quest: Quest;
  isLast: boolean;
};

const QuestItem = ({quest, isLast}: QuestItemProps) => (
  <View style={isLast ? styles.lastQuestItem : styles.questItem}>
    <Text style={styles.questName} numberOfLines={1} ellipsizeMode="tail">
      {quest.name}
    </Text>
    <View style={styles.questExp}>
      <View
        style={[
          styles.gradeCircle,
          {backgroundColor: getGradeColor([quest]).main},
        ]}
      />
      <Text style={styles.expAmount}>{quest.expAmount} D</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  questItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lastQuestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questName: {
    fontFamily: 'Pretendard-Medium',
    flex: 1,
    marginRight: 16,
    color: '#000',
    fontSize: 11.5,
  },
  questExp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeCircle: {
    width: 9,
    height: 9,
    borderRadius: 50,
    marginRight: 5,
  },
  expAmount: {
    color: '#000',
    fontSize: 11.5,
    fontFamily: 'Pretendard-Medium',
  },
});

export default QuestItem;
