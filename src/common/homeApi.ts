import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PinBoardDto, HotBoardDto, HomeNotification, HomeNotificationDto } from '../classes/Home';
import Response from '../classes/Response';

export const getPinBoardContents = async () => {
    try {
         const response = await client.get<AxiosResponse<PinBoardDto[]>>("/home/pin-boards");
        return response.data.data;
    }
    catch (e) {
        console.log("여기는 getPinBoardContents 함수", e);
    }
};

export const getHotBoardContents = async () => {
    try {
         const response = await client.get<AxiosResponse<HotBoardDto>>("/home/hot-posts");
        return response.data.data;
    }
    catch (e) {
        console.log("여기는 getHotBoardContents 함수", e);
    }
};

export async function getNotification(page: number = 0) {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<Response<HomeNotificationDto>>(
      `/notification?${params}`
    );
    return response.data.data.content;
  } catch (e) {
    console.log("여기는 getNotification 함수", e);
  }
}