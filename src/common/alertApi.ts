import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Response from '../classes/Response';
import AlertDto from '../classes/AlertDto';

export const getAlerts = async(page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<Response<AlertDto>>(
      `/notifications?${params}`
    );
    return response.data.data.content;
  } catch (e) {
    console.log("여기는 getAlerts 함수", e.response.data);
  }
}