import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import {getReadableTopic, postDeviceToken, postRegisterTopic} from '../pushApi';
import {getHundredsDigit} from './statusUtil';
import {createAlertSettings} from '../myPageApi';

export const pushTokenLogic = async () => {
  const authStatus = await messaging().requestPermission();
  await messaging().registerDeviceForRemoteMessages();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  await AsyncStorage.setItem('messagePermission', enabled.toString());
  if (enabled) {
    console.log('토큰 발급 로직 들어옴!');
    //알림 설정 api 호출 => 위치나 if문 순서 바꿔야될듯
    // const createResponse = await createAlertSettings();
    // console.log('알림 설정 완료 : ', createResponse);
    // if (getHundredsDigit(createResponse.status) !== 2) {
    //   setTimeout(function () {
    //     Toast.show('알 수 없는 오류가 발생하였습니다. (34)', Toast.SHORT);
    //   }, 100);
    // }
    const fcmFS = await AsyncStorage.getItem('fcmToken');
    const fcmToken = await messaging().getToken();
    console.log('토큰토큰토큰토큰', fcmToken);
    if (fcmFS !== fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      const response = await postDeviceToken(fcmToken);
      console.log(response);
      if (response.status !== 'OK') {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다. (87)', Toast.SHORT);
        }, 100);
      }
    }
  }
};

export const topicTokenLogic = async () => {
  console.log('토픽 토큰 발급 로직 들어옴');
  const enabled = await AsyncStorage.getItem('messagePermission');
  if (JSON.parse(enabled)) {
    await subscribeTopic();
  }
};

export const subscribeTopic = async () => {
  const response = await getReadableTopic();
  console.log(response);
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
      Toast.show('알 수 없는 오류가 발생하였습니다. (57)', Toast.SHORT);
    }, 100);
  }
};

export const unsubscribeTopic = async () => {
  const response = await getReadableTopic();
  console.log(response);
  if (response.code === 'GET_TOKEN_SUCCESS') {
    const topic = response.data.topic;
    messaging()
      .unsubscribeFromTopic(topic)
      .then(() => {
        console.log(`${topic} 구독 해제 성공!!`);
        postRegisterTopic(topic);
      })
      .catch(() => {
        console.log(`${topic} 구독 해제 실패!`);
      });
  } else {
    setTimeout(function () {
      Toast.show('알 수 없는 오류가 발생하였습니다. (57)', Toast.SHORT);
    }, 100);
  }
};
