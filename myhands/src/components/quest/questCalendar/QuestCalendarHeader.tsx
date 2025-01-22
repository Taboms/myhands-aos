import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type HeaderProps = {
  currentDate: Date;
  isCurrentMonth: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDetailPress: () => void;
};

const QuestCalendarHeader = ({
  currentDate,
  isCurrentMonth,
  onPrevMonth,
  onNextMonth,
  onDetailPress,
}: HeaderProps) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <TouchableOpacity onPress={onPrevMonth}>
        <AntDesign name="caretleft" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.dateText}>
        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
      </Text>
      {!isCurrentMonth && (
        <TouchableOpacity onPress={onNextMonth}>
          <AntDesign name="caretright" size={20} color="#000" />
        </TouchableOpacity>
      )}
    </View>
    <TouchableOpacity style={styles.headerRight} onPress={onDetailPress}>
      <Text style={styles.detailText}>상세내역</Text>
      <TouchableOpacity style={styles.detailButton}>
        <FontAwesome name="angle-right" size={18} color="#626262" />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
});

export default QuestCalendarHeader;
