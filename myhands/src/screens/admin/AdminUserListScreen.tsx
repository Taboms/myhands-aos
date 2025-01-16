import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import fetchApi from '@/api/axios';
import AdminSearchBar from '@/components/admin/AdminSearchBar';
import AdminUserList from '@/components/admin/AdminUserList';
import {User} from '@/constants/user';
import {AdminStackParamList} from '@/navigations/stack/AdminStackNavigator';

function AdminUserListScreen({
  navigation,
}: {
  navigation: StackNavigationProp<AdminStackParamList>;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchApi.get<{responseDto: User[]}>('user/list');
      setUsers(response.data.responseDto);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users); // 검색어가 비어 있으면 전체 사용자 표시
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.employeeNum.toString().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchQuery, users]);

  return (
    <ScrollView style={styles.container}>
      <AdminSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      {loading ? (
        <Text style={styles.loadingText}>로딩 중...</Text>
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <AdminUserList
            key={user.userId}
            user={user}
            keyWord={searchQuery}
            navigation={navigation}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
      )}
      {/* {users.map(user => (
        <AdminUserList key={user.userId} user={user} />
      ))} */}
      <View style={styles.emptyContainer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#ffffff',
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
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
});

export default AdminUserListScreen;
