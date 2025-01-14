import React from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import CustomTextMedium from '../styles/CustomTextMedium';
import CustomTextSemiBold from '../styles/CustomTextSemiBold';
import BoardItem from './BoardItem';
import {BoardPost} from '@/api/boardApi';
import {colors} from '@/constants';
import {loggedInNavigations} from '@/constants/navigations';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';

type NavigationProp = StackNavigationProp<LoggedInStackParamList, 'BoardAll'>;

const BoardList = ({posts}: {posts: BoardPost[]}) => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({item, index}: {item: BoardPost; index: number}) => {
    const showNewIndicator = item.timeAgo.endsWith('전'); // N 표시 여부 결정

    return (
      <BoardItem
        item={item}
        isLastItem={index === posts.length - 1}
        showNewIndicator={showNewIndicator}
        onPress={() =>
          navigation.navigate(loggedInNavigations.BOARD_DETAIL, {
            postId: item.boardId,
          })
        }
        showArrow={true}
      />
    );
  };

  const handleViewAllPress = () => {
    navigation.navigate(loggedInNavigations.BOARD_ALL); // 전체보기 화면으로 이동
  };

  return (
    <View style={styles.boardContainer}>
      <View style={styles.boardHeader}>
        <CustomTextSemiBold style={styles.boardTitle}>
          최신글
        </CustomTextSemiBold>
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={handleViewAllPress}
        >
          <CustomTextMedium style={styles.viewAll}>전체보기</CustomTextMedium>
          <Feather name="chevron-right" size={16} color={colors.GRAY_700} />
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
    color: colors.BLACK,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    top: -1,
    fontSize: 13,
    color: colors.GRAY_700,
    marginRight: 2,
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
