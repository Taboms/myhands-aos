import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface NotificationItem {
  category: boolean;
  createdAt: string;
  title: string;
  boardId: number;
  exp: number;
}

interface NotificationSectionProps {
  title: string;
  data: NotificationItem[];
  onClearAll: () => void;
}

const NotificationCard = ({item}: {item: NotificationItem}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>
          {item.category ? '공지사항' : '경험치 획득'}
        </Text>
        <Text style={styles.cardTime}>{item.createdAt}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      {!item.category && (
        <Text style={styles.expText}>{item.exp}+ do를 획득하셨습니다</Text>
      )}
    </View>
  );
};

const NotificationSection = ({
  title,
  data,
  onClearAll,
}: NotificationSectionProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              '알림 삭제',
              '모든 알림을 삭제하시겠습니까?',
              [
                {text: '취소', style: 'cancel'},
                {text: '삭제', onPress: onClearAll},
              ],
              {cancelable: true}
            );
          }}
        >
          <Icon name="more-vertical" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      {data.map((item, index) => (
        <NotificationCard key={index} item={item} />
      ))}
    </View>
  );
};

const NotificationScreen = () => {
  const recentAlarmList: NotificationItem[] = [
    {
      category: false,
      createdAt: '20분 전',
      title: '직무별 퀘스트 성공!',
      boardId: 0,
      exp: 100,
    },
    {
      category: false,
      createdAt: '9시간 전',
      title: '직무별 퀘스트 성공!',
      boardId: 0,
      exp: 100,
    },
    {
      category: true,
      createdAt: '9시간 전',
      title: '공지사항',
      boardId: 9,
      exp: 0,
    },
    {
      category: false,
      createdAt: '13시간 전',
      title: '몰라 퀘스트 성공!',
      boardId: 0,
      exp: 90,
    },
  ];

  const oldAlarmList: NotificationItem[] = [
    {
      category: false,
      createdAt: '2025. 1. 2.',
      title: '리더 부여 퀘스트 성공!',
      boardId: 0,
      exp: 90,
    },
  ];

  const handleClearRecent = () => {
    // 최신 알림 전체 삭제
  };

  const handleClearOld = () => {
    // 이전 알림 전체 삭제
  };

  return (
    <ScrollView style={styles.container}>
      <NotificationSection
        title="최근 받은 알림"
        data={recentAlarmList}
        onClearAll={handleClearRecent}
      />
      <NotificationSection
        title="이전 알림"
        data={oldAlarmList}
        onClearAll={handleClearOld}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  cardTime: {
    fontSize: 14,
    color: '#999',
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  expText: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationScreen;
