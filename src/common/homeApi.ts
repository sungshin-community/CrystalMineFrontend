import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PinBoardDto, HotBoardDto, HomeNotification, HomeNotificationDto } from '../classes/Home';
import Response from '../classes/Response';
import { Authentication } from '../classes/Authentication';

export const getAuthentication = async() => {
  try {
    const response = await client.get<Response<Authentication>>(
      `/user/access`
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getAuthentication 함수", e);
  }
}

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
      `/notifications/home?${params}`
    );
    return response.data.data.content;
  } catch (e) {
    console.log("여기는 getNotification 함수", e);
  }
}

export async function getUnreadNotification() {
  try {
    const response = await client.get<Response<HomeNotificationDto>>(
      `/notifications/home`
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getUnreadNotification 함수", e);
  }
}

export async function readNotification(notificationId: number = 0) {
  try {
    const response = await client.patch<Response<null>>(
      `/notification/${notificationId}`
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 readNotification 함수", e.response);
  }
}