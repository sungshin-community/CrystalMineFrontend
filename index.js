/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'crystalminepush', // (required)
    channelName: 'crystalmine messasge', // (required)
    channelDescription: 'Notification for crystalmine message', // (optional) default: undefined.
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging().onMessage(async remoteMessage => {
  console.log('Foreground push', remoteMessage);
  if (Platform.OS === 'ios') {
    //안드로이드에선 중복으로 와서 처리
    PushNotification.localNotification({
      channelId: 'crystalminepush',
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
    });
  }
});

AppRegistry.registerComponent(appName, () => App);
