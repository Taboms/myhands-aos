// App.tsx
import React, {useEffect} from 'react';
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
  const {showNotification} = useNotification();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log(remoteMessage);
        // 기존 시스템 알림 표시
        pushNoti.displayNoti(remoteMessage);

        // 인앱 알림 표시
        const title = remoteMessage.data?.title?.toString() || 'New Message';
        const body = remoteMessage.data?.body?.toString() || '새 알림 도착!';

        showNotification(title, body);
      }
    );

    return unsubscribe;
  }, [showNotification]);

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
