// 과거 경험치 획득량
import {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {useQuestStore} from '@/store/questStore';

interface ChartData {
  value: number;
  label: string;
  labelTextStyle: {
    fontSize: number;
    fontWeight: number;
    color: string;
  };
}

function ExpHistory() {
  const expHistory = useQuestStore(state => state.questStats?.expHistory ?? []);

  const labelTextStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: '#888',
  };

  const yAxisTextStyle = {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#7e7e7e',
    paddingRight: 10,
  };

  const xAxisTextStyle = {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#000000',
  };

  const data: ChartData[] = useMemo(() => {
    return Object.entries(expHistory).map(([year, value]) => ({
      value,
      label: `${year}년`,
      labelTextStyle,
    }));
  }, [expHistory]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>과거 경험치 획득 동향</Text>
      <View style={styles.chart}>
        <BarChart
          // formatYLabel={(value: string) =>
          //   String(Math.floor(Number(value) / 100) * 100)
          // }
          data={data}
          disablePress={false}
          spacing={23}
          barBorderTopLeftRadius={12}
          barBorderTopRightRadius={12}
          barWidth={35}
          frontColor={'#ffede9'}
          xAxisIndicesColor={'#D9D9D9'}
          xAxisColor={'#d9d9d9'}
          xAxisLabelTextStyle={xAxisTextStyle}
          yAxisTextStyle={yAxisTextStyle}
          yAxisThickness={0}
          noOfSections={3}
          isAnimated={true}
          width={240}
          showGradient={true}
          gradientColor={'#FF8B71'}
          disableScroll={true}
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
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 5,
  },
  chart: {
    marginTop: 40,
    flex: 1,
  },
});

export default ExpHistory;
