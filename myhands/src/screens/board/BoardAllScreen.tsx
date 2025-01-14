import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  BoardPost,
  getBoardPostAll,
  getBoardSearchResults,
} from '@/api/boardApi';
import LoadingScreen from '@/components/LoadingScreen';
import BoardItem from '@/components/board/BoardItem';
import SearchBar from '@/components/board/SearchBar';
import {colors} from '@/constants';
import {loggedInNavigations} from '@/constants/navigations';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';

type NavigationProp = StackNavigationProp<
  LoggedInStackParamList,
  'BoardDetail'
>;

const BoardAllScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastId, setLastId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getBoardPostAll(15, lastId || undefined);
      setPosts(prevPosts => [...prevPosts, ...data]);
      if (data.length > 0) {
        setLastId(data[data.length - 1].boardId);
      } else {
        setLastId(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePosts = async () => {
    if (loadingMore || (!lastId && !isSearching)) {
      return;
    }
    try {
      setLoadingMore(true);
      setLastId(null);
      const data = isSearching
        ? await getBoardSearchResults(searchQuery, 15, lastId || undefined)
        : await getBoardPostAll(15, lastId || undefined);
      setPosts(prevPosts => [...prevPosts, ...data]);
      if (data.length === 15) {
        setLastId(data[data.length - 1].boardId);
      } else {
        setLastId(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setIsSearching(true);
      const data = await getBoardSearchResults(searchQuery, 15);
      setPosts(data);
      if (data.length === 15) {
        setLastId(data[data.length - 1].boardId);
      } else {
        setLastId(null);
      }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const renderItem = ({item}: {item: BoardPost}) => (
    <BoardItem
      item={item}
      isLastItem={false}
      onPress={() =>
        navigation.navigate(loggedInNavigations.BOARD_DETAIL, {
          postId: item.boardId,
        })
      }
      showNewIndicator={false}
      showArrow={false}
    />
  );

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }
    return <ActivityIndicator style={styles.loadingIndicator} />;
  };

  if (loading && posts.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      <FlatList
        data={posts}
        keyExtractor={item => item.boardId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  listContainer: {
    paddingHorizontal: 18,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
});

export default BoardAllScreen;
