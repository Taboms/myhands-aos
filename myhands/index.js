/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

// Background, Quit
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   // console.log('Message handled in the background!', remoteMessage);

//   await notifee.displayNotification({
//     title: remoteMessage.notification?.title || 'Background Notification',
//     body: remoteMessage.notification?.body || 'You received a new message.',
//     android: {
//       channelId: 'default',
//       smallIcon: 'ic_notification',
//     },
//   });
// });

notifee.onBackgroundEvent(async ({type, detail}) => {
  // console.log('Notifee Background Event:', type, detail);

  switch (type) {
    case EventType.DISMISSED:
      console.log('Notification dismissed');
      break;
    case EventType.PRESS:
      console.log('Notification pressed');
      break;
  }
});

AppRegistry.registerComponent(appName, () => App);
