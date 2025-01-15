import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  GestureResponderEvent,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GRADE_COLORS, loggedInNavigations} from '@/constants';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';
import {useQuestStore} from '@/store/questStore';
import {calculateTotalExp, getGradeColor} from '@/utils/quest';

interface QuestCalendarNavigatorProps {
  navigation: MaterialTopTabNavigationProp<LoggedInStackParamList>;
}

function QuestCalendarScreen({navigation}: QuestCalendarNavigatorProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {fetchQuestCalendar, isLoading} = useQuestStore();

  const questList = useQuestStore(
    state => state.questCalendar?.questList ?? []
  );

  const fetchDataForDate = useCallback(
    async (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      await fetchQuestCalendar(year, month);
    },
    [fetchQuestCalendar]
  );

  const getKoreanDate = (date: Date = new Date()) => {
    return new Date(date.toLocaleString('en-US', {timeZone: 'Asia/Seoul'}));
  };
  const today = getKoreanDate();

  const isCurrentMonth = () => {
    return (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth()
    );
  };

  // console.log('Quest List:', JSON.stringify(questList, null, 2));

  const handlePrevMonth = async () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    await fetchDataForDate(newDate);
  };

  const handleNextMonth = async () => {
    const nextDate = new Date(currentDate);
    nextDate.setMonth(nextDate.getMonth() + 1);

    // 다음 달이 현재 월보다 미래인 경우 이동하지 않음
    if (
      nextDate.getFullYear() > today.getFullYear() ||
      (nextDate.getFullYear() === today.getFullYear() &&
        nextDate.getMonth() > today.getMonth())
    ) {
      return;
    }

    setCurrentDate(nextDate);
    await fetchDataForDate(nextDate);
  };
  const handleDetailExp = () => {
    navigation.navigate(loggedInNavigations.EXP_ALL);
  };

  function onDetailPress(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  useEffect(() => {
    fetchDataForDate(currentDate);
  }, [fetchDataForDate, currentDate]);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={handlePrevMonth}>
                <AntDesign name="caretleft" size={15} color="#000" />
              </TouchableOpacity>
              <Text style={styles.dateText}>
                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
              </Text>
              {!isCurrentMonth() && (
                <TouchableOpacity onPress={handleNextMonth}>
                  <AntDesign name="caretright" size={15} color="#000" />
                </TouchableOpacity>
              )}
            </View>
            <Pressable style={styles.headerRight} onPress={handleDetailExp}>
              <Text style={styles.detailText}>상세내역</Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={onDetailPress}
              >
                <FontAwesome name="angle-right" size={18} color="#626262" />
              </TouchableOpacity>
            </Pressable>
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {backgroundColor: GRADE_COLORS.MAX.main},
                ]}
              />
              <Text style={styles.legendText}>MAX</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {backgroundColor: GRADE_COLORS.MED.main},
                ]}
              />
              <Text style={styles.legendText}>MED</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {backgroundColor: GRADE_COLORS.OTHER.main},
                ]}
              />
              <Text style={styles.legendText}>기타</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {backgroundColor: GRADE_COLORS.FAIL.main},
                ]}
              />
              <Text style={styles.legendText}>실패</Text>
            </View>
          </View>

          <View>
            <View style={styles.timeline}>
              <View style={styles.timelineLine} />
              {questList.map((weekQuests, index) => {
                const gradeColor = getGradeColor(weekQuests);
                const totalExp = calculateTotalExp(weekQuests);

                return (
                  <View key={index} style={styles.weekContainer}>
                    <View style={styles.weekLeft}>
                      <View style={styles.weekLeftWrapper}>
                        <Text style={styles.weekText}>{index + 1}주차</Text>
                        <View
                          style={[
                            styles.expCircle,
                            {
                              borderColor: gradeColor.main,
                              backgroundColor: gradeColor.background,
                            },
                          ]}
                        >
                          <Text
                            style={[styles.expText, {color: gradeColor.main}]}
                          >
                            {totalExp} D
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.timelineDot}>
                      <View
                        style={[styles.dot, {backgroundColor: gradeColor.main}]}
                      />
                    </View>

                    <View
                      style={[
                        styles.questContainer,
                        {backgroundColor: gradeColor.background},
                      ]}
                    >
                      {weekQuests.length === 0 ? (
                        <Text style={styles.emptyText}>
                          퀘스트 내역이 존재하지 않습니다.
                        </Text>
                      ) : (
                        weekQuests.map((quest, questIndex) => (
                          <View
                            key={quest.questId}
                            style={[
                              questIndex === weekQuests.length - 1
                                ? styles.lastQuestItem
                                : styles.questItem,
                            ]}
                          >
                            <Text
                              style={styles.questName}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {quest.name}
                            </Text>
                            <View style={styles.questExp}>
                              <View
                                style={[
                                  styles.gradeCircle,
                                  {
                                    backgroundColor: getGradeColor([quest])
                                      .main,
                                  },
                                ]}
                              />
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: 11.5,
                                  fontFamily: 'Pretendard-Medium',
                                }}
                              >
                                {quest.expAmount} D
                              </Text>
                            </View>
                          </View>
                        ))
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '7%',
    paddingHorizontal: '7%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 24,
    marginHorizontal: 10,
    color: '#000',
    fontFamily: 'Pretendard-SemiBold',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: '#626262',
    fontSize: 13,
    marginRight: 7,
    fontFamily: 'Pretendard-Medium',
  },
  detailButton: {
    marginLeft: 'auto',
  },
  // 기준
  legend: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 23,
    marginBottom: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
    color: '#000',
  },
  // 하단 타임라인
  timeline: {
    position: 'relative',
    marginBottom: 50,
  },
  timelineLine: {
    position: 'absolute',
    left: 95,
    top: -10,
    bottom: 0,
    width: 1,
    backgroundColor: '#D9D9D9',
    zIndex: 1,
  },
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
  emptyText: {
    fontFamily: 'Pretendard-Medium',
    marginRight: 16,
    color: '#000',
    fontSize: 11.5,
  },
});

export default QuestCalendarScreen;
