// import React, {useEffect, useState} from 'react';
// import {Text, TouchableHighlight, View} from 'react-native';
// import notifee from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';

// const NotificationScreen = () => {
//   const [fcmToken, setFcmToken] = useState('');

//   useEffect(() => {
//     getFcmToken();
//     console.log('[+] FCM 메시지 리스너가 등록되었습니다.!');
//     const unsubscribe = messaging().onMessage(
//       async remoteMessage => await onMessageReceived(remoteMessage)
//     ); // 활성 상태 및 포그라운드 상태일때 FCM 메시지 수신

//     return () => {
//       console.log('[-] FCM 메시지 리스너가 사라졌습니다!');
//       unsubscribe();
//     };
//   }, []);

//   /**
//    * FCM 토큰을 받습니다.
//    */
//   const getFcmToken = async () => {
//     const fcmTokenInfo = await messaging().getToken();
//     setFcmToken(fcmTokenInfo);
//   };

//   /**
//    * FCM 메시지 수신 리스너를 등록합니다. (Foreground, Background 상태)
//    * @param {FirebaseMessagingTypes.RemoteMessage} message
//    * @return {Promise<void>}
//    */
//   const onMessageReceived = async (
//     message: FirebaseMessagingTypes.RemoteMessage
//   ) => {
//     console.log('title :: ', message.notification!.title);
//     console.log('body :: ', message.notification!.body);

//     // 알림 채널을 생성합니다.
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });

//     // 디바이스에 알림을 표시합니다.
//     await notifee.displayNotification({
//       title: message.notification!.title,
//       body: message.notification!.body,
//       android: {
//         channelId: channelId,
//         smallIcon: 'ic_launcher',
//       },
//     });
//   };

//   /**
//    * 푸시 메시지를 전송합니다.
//    */
//   const sendPushMessage = async () => {
//     const sendInfo = {
//       token: fcmToken,
//       title: '테스트 전송합니다.',
//       body: '테스트로 전송하는 내용입니다.',
//     };

//     await fetch('<http://xxx.xxx.xx.xx:8000/api/v1/fcm/send>', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(sendInfo),
//     })
//       // Response 데이터 파싱
//       .then(response => response.json())
//       .then(res => {
//         const {result, resultCode} = res;

//         console.log(result, resultCode);
//       })
//       .catch(error => {
//         console.log(`에러가 발생하였습니다 ${error}`);
//       });
//   };

//   return (
//     <View>
//       <TouchableHighlight onPress={sendPushMessage}>
//         <Text>알람 전송</Text>
//       </TouchableHighlight>
//     </View>
//   );
// };
// export default NotificationScreen;
