import React from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import BoardItem from './BoardItem';
import {BoardPost} from '@/api/boardApi';
import {colors} from '@/constants';

const BoardList = ({posts}: {posts: BoardPost[]}) => {
  const renderItem = ({item, index}: {item: BoardPost; index: number}) => (
    <BoardItem item={item} isLastItem={index === posts.length - 1} />
  );

  return (
    <View style={styles.boardContainer}>
      <View style={styles.boardHeader}>
        <Text style={styles.boardTitle}>최신글</Text>
        <TouchableOpacity style={styles.viewAllContainer}>
          <Text style={styles.viewAll}>전체보기</Text>
          <Text style={styles.viewAllArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item.boardId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    position: 'absolute',
    top: '18%',
    left: 25,
    right: 25,
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    padding: 23,
    elevation: 5,
    zIndex: 2,
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 13,
    color: colors.GRAY_700,
    marginRight: 4,
  },
  viewAllArrow: {
    fontSize: 13,
    color: colors.GRAY_700,
  },
  list: {
    paddingBottom: 16,
  },
});

export default BoardList;
