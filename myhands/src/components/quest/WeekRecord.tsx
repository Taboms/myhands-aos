import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {addWeeks, getWeek, getMonth} from 'date-fns';

interface WeekInfo {
  month: number;
  week: number;
  date: Date;
}

function WeekRecord() {
  const getCurrentWeekRange = (): WeekInfo[] => {
    const currentDate = new Date();
    const weeks: WeekInfo[] = [];

    // 3주 전부터
    let tempDate = addWeeks(currentDate, -3);

    // 3주 후까지
    for (let i = 0; i < 7; i++) {
      weeks.push({
        month: getMonth(tempDate) + 1, // getMonth는 0부터 시작하므로 +1
        week: getWeek(tempDate),
        date: tempDate,
      });
      tempDate = addWeeks(tempDate, 1);
    }

    return weeks;
  };

  console.log(getCurrentWeekRange());
  return <View />;
}

const styles = StyleSheet.create({});

export default WeekRecord;
