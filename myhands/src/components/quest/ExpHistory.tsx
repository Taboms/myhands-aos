// 과거 경험치 획득량
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

function ExpHistory() {
  const labelTextStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: '#888',
  };

  const yAxisTextStyle = {
    fontSize: 12,
    color: '#888',
  };

  const data = [
    {value: 7000, label: '2021년', labelTextStyle: labelTextStyle},
    {value: 7000, label: '2022년', labelTextStyle: labelTextStyle},
    {value: 10000, label: '2023년', labelTextStyle: labelTextStyle},
    {value: 12000, label: '2024년', labelTextStyle: labelTextStyle},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>과거 경험치 획득 동향</Text>
      <View style={styles.chart}>
        {/* Bar Chart */}
        <BarChart
          // 기본
          formatYLabel={value => String(Math.floor(Number(value) / 100) * 100)}
          data={data}
          disablePress={false} // 누루기 동작 비활성화
          // bar
          // initialSpacing={20} // 초기 간격
          spacing={23} // bar 간격
          barBorderTopLeftRadius={12}
          barBorderTopRightRadius={12}
          barWidth={35} // bar width
          frontColor={'#ffede9'} // bar 색상
          // x축
          xAxisIndicesColor={'#D9D9D9'} // x축 단계별 표시 색상
          xAxisColor={'#d9d9d9'} // x축 색상
          // y축
          yAxisTextStyle={yAxisTextStyle}
          yAxisThickness={0} // 메인 y축
          noOfSections={3} // 가로 회색줄 갯수
          isAnimated={true}
          width={235}
          showGradient={true}
          gradientColor={'#FF8B71'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginTop: 25,
    padding: 24,
  },
  title: {
    fontSize: 16,
    letterSpacing: -1,
    lineHeight: 22,
    fontWeight: '500',
    color: '#303030',
  },
  chart: {
    marginTop: 40,
    flex: 1,
  },
});

export default ExpHistory;
