import client from './client';
import {AxiosResponse} from 'axios';
import PushTopic from '../classes/Push';
import Response from '../classes/Response';
import {AlertData} from '../classes/AlertDto';

export const postDeviceToken = async (token: string) => {
  try {
    const response = await client.post<AxiosResponse>('/push', {
      fcmToken: token,
    });
    console.log('push token 전송 response:', response.data);
    return response.data;
  } catch (error: any) {
    console.log('push token 전송 실패', error.response.data);
    return error.response.data;
  }
};

export const getReadableTopic = async () => {
  try {
    const response = await client.get<Response<PushTopic>>('/push/topic/read');
    return response.data;
  } catch (error: any) {
    console.log('topic 발급 실패', error.response.data);
    return error.response.data;
  }
};

export const postRegisterTopic = async (topic: string) => {
  try {
    const response = await client.post<AxiosResponse>('/push/topic/register', {
      fcmTopic: topic,
    });
    return response.data;
  } catch (e) {
    console.log('topic 전송 실패', e.response.data);
    return e.response.data;
  }
};

export const readNotificationOnPush = async (data: AlertData) => {
  try {
    const response = await client.patch<AxiosResponse>('/notifications', {
      data,
    });
    return response.data;
  } catch (error: any) {
    console.log('push 알림 클릭 시 읽음 실패', error.response.data);
  }
};
