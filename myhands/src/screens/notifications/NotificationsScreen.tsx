import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import {AlarmList, getAlarmList} from '@/api/notification';
import {notiIcons} from '@/assets/icons/notiIcons';
import LoadingScreen from '@/components/LoadingScreen';
import {useNotificationStore} from '@/store/notificationStore';
import {Alarm} from '@/types/domain';

interface NotificationSectionProps {
  title: string;
  data: Alarm[];
  onClearAll: () => void;
}

const NotificationCard = ({item}: {item: Alarm}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTypeContainer}>
          <View style={styles.iconContainer}>
            <SvgXml
              xml={item.category ? notiIcons.board : notiIcons.exp}
              width={16} // 아이콘 크기만 키움
              height={16}
            />
          </View>
          <Text style={styles.cardType}>
            {item.category ? '공지사항' : '경험치 획득'}
          </Text>
        </View>
        <Text style={styles.cardTime}>{item.createdAt}</Text>
      </View>
      {!item.category ? (
        <Text style={styles.cardTitleExp}>{item.title}</Text>
      ) : (
        <Text style={styles.cardTitleBoard}>{item.title}</Text>
      )}
      {!item.category && (
        <Text style={styles.expText}>{item.exp} do를 획득하셨습니다</Text>
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
  const {fetchNotiList, notiList} = useNotificationStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchNotiList();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchNotiList]);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleClearRecent = () => {
    // 최신 알림 전체 삭제
  };

  const handleClearOld = () => {
    // 이전 알림 전체 삭제
  };

  return (
    <ScrollView style={styles.container}>
      <NotificationSection
        title="최근 알림"
        data={notiList.recentAlarmList}
        onClearAll={handleClearRecent}
      />
      <NotificationSection
        title="이전 알림"
        data={notiList.oldAlarmList}
        onClearAll={handleClearOld}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  section: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 25,
    color: '#333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#EBEBEB',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  cardType: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cardTime: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#000',
  },
  cardTitleExp: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#000',
    marginBottom: 0,
  },
  cardTitleBoard: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  expText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
});

export default NotificationScreen;
