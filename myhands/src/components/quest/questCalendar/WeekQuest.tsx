import {View, Text, StyleSheet} from 'react-native';
import QuestItem from './QuestItem';
import {Quest} from '@/types/domain';

type WeekQuestsProps = {
  weekQuests: Quest[];
  weekIndex: number;
  gradeColor: {main: string; background: string};
  totalExp: number;
};

const WeekQuests = ({
  weekQuests,
  weekIndex,
  gradeColor,
  totalExp,
}: WeekQuestsProps) => (
  <View style={styles.weekContainer}>
    <View style={styles.weekLeft}>
      <View style={styles.weekLeftWrapper}>
        <Text style={styles.weekText}>{weekIndex + 1}주차</Text>
        <View
          style={[
            styles.expCircle,
            {
              borderColor: gradeColor.main,
              backgroundColor: gradeColor.background,
            },
          ]}
        >
          <Text style={[styles.expText, {color: gradeColor.main}]}>
            {totalExp} D
          </Text>
        </View>
      </View>
    </View>

    <View style={styles.timelineDot}>
      <View style={[styles.dot, {backgroundColor: gradeColor.main}]} />
    </View>

    <View
      style={[styles.questContainer, {backgroundColor: gradeColor.background}]}
    >
      {weekQuests.length === 0 ? (
        <Text style={styles.emptyText}>퀘스트 내역이 존재하지 않습니다.</Text>
      ) : (
        weekQuests.map((quest, index) => (
          <QuestItem
            key={quest.questId}
            quest={quest}
            isLast={index === weekQuests.length - 1}
          />
        ))
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    marginBottom: 35,
    position: 'relative',
  },
  weekLeft: {
    width: 100,
  },
  weekLeftWrapper: {
    width: 75,
    alignItems: 'center',
  },
  weekText: {
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 8,
    fontWeight: '500',
    color: '#555555',
    fontSize: 19,
  },
  expCircle: {
    width: 75,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
  },
  timelineDot: {
    position: 'absolute',
    left: 95,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    position: 'absolute',
    top: 10,
    left: -4.5,
    zIndex: 2,
  },
  questContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 24,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignSelf: 'flex-start',
  },
  emptyText: {
    fontFamily: 'Pretendard-Medium',
    marginRight: 16,
    color: '#000',
    fontSize: 11.5,
  },
});

export default WeekQuests;
