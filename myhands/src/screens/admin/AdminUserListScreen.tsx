import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
} from 'react-native';
import fetchApi from '@/api/axios';
import {BoardPost} from '@/api/boardApi';
import AdminSearchBar from '@/components/admin/AdminSearchBar';
import AdminUserList from '@/components/admin/AdminUserList';
import {User} from '@/constants/user';

function AdminUserListScreen() {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [lastId, setLastId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchApi.get<{responseDto: User[]}>('user/list');
      setUsers(response.data.responseDto); // API 응답에서 사용자 데이터를 설정
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // 컴포넌트가 마운트될 때 사용자 데이터를 가져옴
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setIsSearching(true);
      // const data = await getBoardSearchResults(searchQuery, 15);
      // setPosts(data);
      // if (data.length === 15) {
      //   setLastId(data[data.length - 1].boardId);
      // } else {
      //   setLastId(null);
      // }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <AdminSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      {users.map(user => (
        <AdminUserList user={user} />
      ))}
      <View style={styles.emptyContainer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    // borderWidth: 2,
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  profile: {
    width: 48,
    height: 48,
    marginRight: 7,
  },
  nameSpace: {
    display: 'flex',
    flexDirection: 'column',
  },
  emptyContainer: {
    height: 20,
  },
});

export default AdminUserListScreen;
