/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import Toast from 'react-native-simple-toast';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging().onMessage(async remoteMessage => {
  console.log("Foreground push", remoteMessage);
  PushNotification.localNotification({
    message: remoteMessage.notification.body,
    title: remoteMessage.notification.title
  });
});

AppRegistry.registerComponent(appName, () => App);
