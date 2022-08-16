import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Response from '../classes/Response';
import AlertDto, {Alert} from '../classes/AlertDto';

export const getAlerts = async() => {
  try {
    // const params = new URLSearchParams();
    // params.append('page', page.toString());
    // const response = await client.get<Response<AlertDto>>(
    // Alerts에 페이지네이션 없애서 구조 변경됨, 페이지네이션 살아날 수도 있어서 남겨둠.
    const response = await client.get<Response<Alert[]>>(
      `/notifications`
    );
    return response.data.data;
  } catch (e: any) {
    console.log("여기는 getAlerts 함수", e.response.data);
  }
}