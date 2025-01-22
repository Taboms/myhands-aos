import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type HeaderProps = {
  currentDate: Date;
  isCurrentMonth: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDetailPress: () => void;
  onSelect: (date: Date) => void;
};

const QuestCalendarHeader = ({
  currentDate,
  isCurrentMonth,
  onPrevMonth,
  onNextMonth,
  onDetailPress,
  onSelect,
}: HeaderProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateConfirm = (year: number, month: number) => {
    setShowPicker(false);
    onSelect(new Date(year, month - 1));
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={onPrevMonth}>
          <AntDesign name="caretleft" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </Text>
        </TouchableOpacity>
        {!isCurrentMonth && (
          <TouchableOpacity onPress={onNextMonth}>
            <AntDesign name="caretright" size={20} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.headerRight} onPress={onDetailPress}>
        <Text style={styles.detailText}>상세내역</Text>
        <FontAwesome name="angle-right" size={18} color="#626262" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,
    marginHorizontal: 10,
    color: '#000',
    fontFamily: 'Pretendard-SemiBold',
  },
  detailText: {
    color: '#626262',
    fontSize: 13,
    marginRight: 7,
    fontFamily: 'Pretendard-Medium',
  },
});

export default QuestCalendarHeader;
