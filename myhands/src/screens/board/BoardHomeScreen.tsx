import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {getBoardPosts, BoardPost} from '@/api/boardApi';
import LoadingScreen from '@/components/LoadingScreen';
import BoardList from '@/components/board/BoardList';
import Header from '@/components/board/Header';

const BoardScreen = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBoardPosts(5);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Image
        source={require('@/assets/image/board-ellipse.png')}
        style={styles.curveImage}
        resizeMode="stretch"
      />
      <BoardList posts={posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  curveImage: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 150,
    width: '100%',
    zIndex: 1,
  },
});

export default BoardScreen;
