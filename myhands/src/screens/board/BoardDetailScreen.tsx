import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {getBoardDetail, BoardDetail} from '@/api/boardApi';
import LoadingScreen from '@/components/LoadingScreen';
import {colors} from '@/constants';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';

type BoardDetailScreenRouteProp = RouteProp<
  LoggedInStackParamList,
  'BoardDetail'
>;

const BoardDetailScreen = () => {
  const route = useRoute<BoardDetailScreenRouteProp>();
  const {postId} = route.params; // postId 받아오기
  const [post, setPost] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getBoardDetail(postId);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>게시글을 불러오는 데 실패했습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.time}>{post.createdAt}</Text>
      <View style={styles.separator} />
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.RED_800,
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: colors.GRAY_700,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: colors.GRAY_200,
    marginVertical: 18,
  },
  content: {
    fontSize: 14,
    color: colors.BLACK,
    lineHeight: 24,
  },
});

export default BoardDetailScreen;
