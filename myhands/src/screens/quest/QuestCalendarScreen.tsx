import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, ActivityIndicator, StyleSheet, View} from 'react-native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import QuestCalendarHeader from '@/components/quest/questCalendar/QuestCalendarHeader';
import QuestLegend from '@/components/quest/questCalendar/QuestLegend';
import WeekQuests from '@/components/quest/questCalendar/WeekQuest';
import {loggedInNavigations} from '@/constants';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';
import {useQuestStore} from '@/store/questStore';
import {calculateTotalExp, getGradeColor} from '@/utils/quest';

type QuestCalendarNavigatorProps = {
  navigation: MaterialTopTabNavigationProp<LoggedInStackParamList>;
};

const QuestCalendarScreen = ({navigation}: QuestCalendarNavigatorProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const {fetchQuestCalendar} = useQuestStore();
  const questList = useQuestStore(
    state => state.questCalendar?.questList ?? []
  );

  const getKoreanDate = (date: Date = new Date()) => {
    return new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  };

  const today = getKoreanDate();
  const isCurrentMonth = useCallback(
    () =>
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth(),
    [currentDate, today]
  );

  const fetchDataForDate = useCallback(
    async (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      await fetchQuestCalendar(year, month);
    },
    [fetchQuestCalendar]
  );

  useEffect(() => {
    fetchDataForDate(currentDate);
  }, [fetchDataForDate, currentDate]);

  const handleMonthChange = useCallback(
    async (increment: number) => {
      setLoading(true);
      try {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentDate(newDate);
        await fetchDataForDate(newDate);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [currentDate, fetchDataForDate]
  );

  const handleDateSelect = () => {
    console.log('select!');
  };

  return (
    <ScrollView style={styles.container}>
      <QuestCalendarHeader
        currentDate={currentDate}
        isCurrentMonth={isCurrentMonth()}
        onPrevMonth={() => handleMonthChange(-1)}
        onNextMonth={() => handleMonthChange(1)}
        onDetailPress={() => navigation.navigate(loggedInNavigations.EXP_ALL)}
        onSelect={handleDateSelect}
      />
      <QuestLegend />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF8366" />
        </View>
      ) : (
        <View style={styles.timeline}>
          <View style={styles.timelineLine} />
          {questList.map((weekQuests, index) => (
            <WeekQuests
              key={index}
              weekQuests={weekQuests}
              weekIndex={index}
              gradeColor={getGradeColor(weekQuests)}
              totalExp={calculateTotalExp(weekQuests)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '7%',
    paddingHorizontal: '7%',
  },
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
});

export default QuestCalendarScreen;
