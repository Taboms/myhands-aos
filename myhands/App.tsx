import React, {useEffect} from 'react';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {NotificationProvider} from '@/hooks/useNotification';
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
        await notifee.createChannel({
          id: 'default',
          name: '마이핸즈',
          importance: AndroidImportance.HIGH,
        });

        // 채널 존재 확인
        // const channels = await notifee.getChannels();
        // console.log('Available channels:', channels);
      } catch (error) {
        console.error('Error creating notification channel:', error);
      }
    }
    setupNotificationChannel();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        // console.log('FCM message received:', remoteMessage); // FCM 메시지 수신 확인
        // console.log('Foreground message received:', remoteMessage);
        // FCM 알림 대신 Notifee로 알림 표시
        pushNoti.displayNoti(remoteMessage);
      }
    );

    return unsubscribe;
  }, []);

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
