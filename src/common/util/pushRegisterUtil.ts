import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import {getReadableTopic, postDeviceToken, postRegisterTopic} from '../pushApi';
import {getHundredsDigit} from './statusUtil';

export const pushTokenLogic = async () => {
  const authStatus = await messaging().requestPermission();
  await messaging().registerDeviceForRemoteMessages();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  AsyncStorage.setItem('messagePermission', enabled.toString());
  if (enabled) {
    //알림 설정 api 호출
    const fcmFS = await AsyncStorage.getItem('fcmToken');
    const fcmToken = await messaging().getToken();
    console.log('토큰토큰토큰토큰', fcmToken);
    if (fcmFS !== fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      const response = await postDeviceToken(fcmToken);
      if (getHundredsDigit(response.status) !== 2) {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }, 100);
      }
    }
  }
};

export const topicTokenLogic = async () => {
  const enabled = await AsyncStorage.getItem('messsagePermission');
  if (JSON.parse(enabled)) {
    const response = await getReadableTopic();
    if (response.code === 'GET_TOKEN_SUCCESS') {
      const topic = response.data.topic;
      messaging()
        .subscribeToTopic(topic)
        .then(() => {
          console.log(`${topic} 구독 성공!!`);
          postRegisterTopic(topic);
        })
        .catch(() => {
          console.log(`${topic} 구독 실패!`);
        });
    } else {
      setTimeout(function () {
        Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
      }, 100);
    }
  }
};
