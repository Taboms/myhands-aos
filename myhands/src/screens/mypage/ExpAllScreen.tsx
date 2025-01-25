import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {getExpListData, Exp} from '@/api/mypage';
import LoadingScreen from '@/components/LoadingScreen';
import ExpItem from '@/components/exp/ExpItem';
import Label from '@/components/exp/Label';
import CustomTextSemiBold from '@/components/styles/CustomTextSemiBold';
import {colors} from '@/constants';

function ExpAllScreen() {
  const [expListData, setExpListData] = useState<Exp[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);

    try {
      const data = await getExpListData(15, currentPage);
      setExpListData(prevData => [...prevData, ...data.quests]);
      setHasMore(data.hasMore);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchData();
    }
  };

  if (loading && currentPage === 0) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      data={expListData}
      keyExtractor={item => item.questId.toString()}
      renderItem={({item}) => <ExpItem quest={item} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <LoadingScreen /> : null}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <CustomTextSemiBold style={styles.title}>
            올해 누적 경험치
          </CustomTextSemiBold>
          <View style={styles.labelContainer}>
            <Label type="MAX" />
            <Label type="MED" />
            <Label type="기타" />
          </View>
        </View>
      }
      style={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.BLACK,
    marginBottom: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
});

export default ExpAllScreen;
