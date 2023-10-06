import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import {getReadableTopic, postDeviceToken, postRegisterTopic} from '../pushApi';
import {createAlertSettings} from '../myPageApi';

export const pushTokenLogic = async () => {
  const authStatus = await messaging().requestPermission();
  await messaging().registerDeviceForRemoteMessages();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  const settingCreated = await AsyncStorage.getItem('messagePermission');
  if (settingCreated === null) {
    const createResponse = await createAlertSettings();
    console.log('알림 설정 완료 : ', createResponse);
  }

  await AsyncStorage.setItem('messagePermission', enabled.toString());
  if (enabled) {
    console.log('토큰 발급 로직 들어옴!');
    try {
      const fcmFS = await AsyncStorage.getItem('fcmToken');
      const fcmToken = await messaging().getToken();
      console.log('토큰토큰토큰토큰', fcmToken);
      if (fcmFS !== fcmToken) {
        const response = await postDeviceToken(fcmToken);
        console.log(response);
        if (response.status !== 'OK') {
          setTimeout(function () {
            Toast.show('알 수 없는 오류가 발생하였습니다. (87)', Toast.SHORT);
          }, 100);
        } else if (response.status === 'OK') {
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    } catch (error) {
      console.log('에러 발생함', error);
    }
  }
};

export const subscribeTopic = async (topic: string) => {
  messaging()
    .subscribeToTopic(topic)
    .then(() => {
      console.log(`${topic} 구독 성공!!`);
      postRegisterTopic(topic);
    })
    .catch(() => {
      console.log(`${topic} 구독 실패!`);
    });
};

// 변수가 0 또는 null일 때에는 전부 구독, 1일 때에는 총학만 구독, 2일 때에는 수광만 구독
export const topicTokenLogic = async (caseNum: number | null) => {
  console.log('토픽 토큰 발급 로직 들어옴');
  const enabled = await AsyncStorage.getItem('messagePermission');
  if (enabled === 'true') {
    const response = await getReadableTopic();
    if (response.code === 'GET_TOKEN_SUCCESS') {
      switch (caseNum) {
        case 0:
          await subscribeTopic(response.data.topic);
        // eslint-disable-next-line no-fallthrough
        case 1:
          // await subscribeTopic(response.data.chTopic);
          break;
        case 2:
          await subscribeTopic(response.data.topic);
          break;
        default:
          await subscribeTopic(response.data.topic);
          // await subscribeTopic(response.data.chTopic);
          break;
      }
    } else {
      setTimeout(function () {
        Toast.show('알 수 없는 오류가 발생하였습니다. (57)', Toast.SHORT);
      }, 100);
    }
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

export const unsubscribeChTopic = async () => {
  const response = await getReadableTopic();
  console.log(response);
  if (response.code === 'GET_TOKEN_SUCCESS') {
    const chTopic = response.data.chTopic;
    messaging()
      .unsubscribeFromTopic(chTopic)
      .then(() => {
        console.log(`${chTopic}총학 구독 해제 성공!!`);
        postRegisterTopic(chTopic);
      })
      .catch(() => {
        console.log(`${chTopic}총학 구독 해제 실패!`);
      });
  } else {
    setTimeout(function () {
      Toast.show('알 수 없는 오류가 발생하였습니다. (67)', Toast.SHORT);
    }, 100);
  }
};
