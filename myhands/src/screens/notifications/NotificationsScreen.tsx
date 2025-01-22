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
import {notiIcons} from '@/assets/icons/notiIcons';
import LoadingScreen from '@/components/LoadingScreen';
import {useNotificationStore} from '@/store/notificationStore';
import {Alarm} from '@/types/domain';
import {alertIcons} from '@/assets/icons/alertIcons';
import {deleteRecentAlarm} from '@/api/notification';
import CustomModal from '@/components/_modal/CustomModal';

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

const deleteRecentAlarms = async () => {
  try {
    await deleteRecentAlarm();
  } catch (error) {
    // 실패 처리 (예: 에러 메시지 표시)
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
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
        <TouchableOpacity onPress={onClearAll} style={styles.deleteBtn}>
          <SvgXml xml={alertIcons.add} style={{marginRight: 4}}></SvgXml>
          <Text style={styles.deleteText}>삭제</Text>
          {/* <Icon name="more-vertical" size={24} color="#666" /> */}
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
  const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);

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

  const handleClearRecent = async (index: number) => {
    if (index === 1) {
      try {
        await deleteRecentAlarm();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  };

  const handleClearOld = () => {
    // 이전 알림 전체 삭제
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <NotificationSection
          title="최근 알림"
          data={notiList.recentAlarmList}
          onClearAll={() => setIsRecentModalOpen(true)}
        />
        <NotificationSection
          title="이전 알림"
          data={notiList.oldAlarmList}
          onClearAll={() => setIsRecentModalOpen(true)}
        />
      </ScrollView>
      <CustomModal
        state="DeleteRecentAlarm"
        type="warning"
        isOpen={isRecentModalOpen}
        onClose={() => setIsRecentModalOpen(false)}
        onButtonClick={handleClearRecent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    color: '#303030',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
    // marginBottom: 30,
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
