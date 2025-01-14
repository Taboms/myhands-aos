import React, {useEffect} from 'react';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {NotificationProvider, useNotification} from '@/hooks/useNotification';
import RootNavigator from '@/navigations/root/RootNavigator';
import pushNoti from '@/utils/pushNoti';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function AppContent() {
  useEffect(() => {
    async function setupNotificationChannel() {
      try {
        const channel = await notifee.createChannel({
          id: 'default',
          name: '마이핸즈',
          importance: AndroidImportance.HIGH,
        });
        console.log('Notification channel created:', channel);

        // 채널 존재 확인
        const channels = await notifee.getChannels();
        console.log('Available channels:', channels);
      } catch (error) {
        console.error('Error creating notification channel:', error);
      }
    }
    setupNotificationChannel();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('FCM message received:', remoteMessage); // FCM 메시지 수신 확인
        // console.log('Foreground message received:', remoteMessage);
        // FCM 알림 대신 Notifee로 알림 표시
        pushNoti.displayNoti(remoteMessage);
      }
    );

    return unsubscribe;
  }, []);

  // const {showNotification} = useNotification();

  // useEffect(() => {
  //   async function setupNotificationChannel() {
  //     // 알림 채널 생성
  //     await notifee.createChannel({
  //       id: 'default', // 채널 ID
  //       name: '마이핸즈', // 사용자에게 표시될 채널 이름
  //       importance: 4, // 알림 중요도
  //     });
  //   }
  //   setupNotificationChannel();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(
  //     async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  //       // 시스템 자체 알림
  //       pushNoti.displayNoti(remoteMessage);

  //       // 인앱 알림 표시
  //       // const title =
  //       //   remoteMessage.notification?.title?.toString() || 'New Message';
  //       // const body =
  //       //   remoteMessage.notification?.body?.toString() || '새 알림 도착!';
  //       // showNotification(title, body);
  //     }
  //   );

  //   return unsubscribe;
  // }, [showNotification]);

  return (
    <NavigationContainer theme={AppTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;
