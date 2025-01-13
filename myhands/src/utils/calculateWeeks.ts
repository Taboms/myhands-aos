import {
  addWeeks,
  startOfWeek,
  getMonth,
  isSameMonth,
  startOfMonth,
} from 'date-fns';

export interface WeekInfo {
  month: number;
  week: number;
}

const calculateWeeks = (): WeekInfo[] => {
  const currentDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000); // UTC+9, 한국 기준
  const weeks: WeekInfo[] = [];
  // 3주 전 날짜
  let tempDate = addWeeks(currentDate, -3);

  // 시작 주 정보 초기 설정
  const firstWeekStart = startOfWeek(tempDate, {weekStartsOn: 1});
  const firstWeekEnd = addWeeks(firstWeekStart, 1);
  const isFirstWeekOverlapping = !isSameMonth(firstWeekStart, firstWeekEnd);

  let currentMonth: number;
  let currentWeek: number;

  if (isFirstWeekOverlapping) {
    // 시작 주가 월을 걸치는 경우: 다음 달의 1주차로 계산
    currentMonth = getMonth(firstWeekEnd);
    currentWeek = 1;
  } else {
    // 그 외: 해당 월의 주차 계산
    currentMonth = getMonth(firstWeekStart) + 1;
    const monthStart = startOfMonth(firstWeekStart);
    const firstMondayOfMonth = startOfWeek(monthStart, {weekStartsOn: 1});
    const weekDiff = Math.floor(
      (firstWeekStart.getTime() - firstMondayOfMonth.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );
    currentWeek = weekDiff + 1;
  }

  for (let i = 0; i < 7; i++) {
    const weekStart = startOfWeek(tempDate, {weekStartsOn: 1});
    const weekEnd = addWeeks(weekStart, 1);

    // 월이 걸쳐있는지 확인
    const isOverlapping = !isSameMonth(weekStart, weekEnd);
    if (isOverlapping) {
      // 걸쳐있는 경우: 다음 달의 1주차로 리셋
      currentMonth = getMonth(weekEnd) + 1;
      currentWeek = 1;
    } else {
      // 그 외: 이전 주차에서 이어서 계산
      if (i > 0) {
        currentWeek++;
      }
    }

    weeks.push({
      month: currentMonth,
      week: currentWeek,
    });

    tempDate = addWeeks(tempDate, 1);
  }

  return weeks;
};

export default calculateWeeks;
