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

// fcm 토픽 등록
export const registerTopic = async (topic: string) => {
  const response = await postRegisterTopic(topic);
  if (response.code === 'REGISTER_FCM_KEY_SUCCESS') {
    return true;
  } else {
    return false;
  }
};

// 토픽 구독
export const subscribeTopic = async (topic: string) => {
  messaging()
    .subscribeToTopic(topic)
    .then(() => {
      console.log(`${topic} 구독 성공!!`);
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
          await subscribeTopic(response.data.noitce);
        // eslint-disable-next-line no-fallthrough
        case 1:
          await subscribeTopic(response.data.studentCouncil);
          break;
        case 2:
          await subscribeTopic(response.data.notice);
          break;
        default:
          // default - 푸시 알림 설정 관련 인자가 들어오지 않을 때
          await subscribeTopic(response.data.notice);
          await subscribeTopic(response.data.studentCouncil);
          // fcm 토픽 등록 - 토픽 고윳값 기기 토큰 등록 시 최초 한번만 진행하면 됨
          const registerEnabled = await registerTopic(response.data.topic);
          if (registerEnabled) {
            console.log('fcm 토픽 토큰 등록 성공');
          } else {
            console.log('fcm 토픽 토큰 등록 실패');
          }
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
    const studentCouncilTopic = response.data.studentCouncil;
    messaging()
      .unsubscribeFromTopic(studentCouncilTopic)
      .then(() => {
        console.log(`${studentCouncilTopic}총학 구독 해제 성공!!`);
      })
      .catch(() => {
        console.log(`${studentCouncilTopic}총학 구독 해제 실패!`);
      });
  } else {
    setTimeout(function () {
      Toast.show('알 수 없는 오류가 발생하였습니다. (67)', Toast.SHORT);
    }, 100);
  }
};
