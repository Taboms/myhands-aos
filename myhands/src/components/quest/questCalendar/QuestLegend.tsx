import {View, Text, StyleSheet} from 'react-native';
import {GRADE_COLORS} from '@/constants';

const QuestLegend = () => (
  <View style={styles.legend}>
    {Object.entries(GRADE_COLORS).map(([grade, color]) => (
      <View key={grade} style={styles.legendItem}>
        <View style={[styles.legendDot, {backgroundColor: color.main}]} />
        <Text style={styles.legendText}>
          {grade === 'OTHER' ? '기타' : grade}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
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
});

export default QuestLegend;
