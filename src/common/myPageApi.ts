import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosResponse} from 'axios';
import User from '../classes/User';
import Response from '../classes/Response';
import WriteRequest from '../classes/WriteRequest';
import WriteResponse from '../classes/WriteResponse';

export const getUser = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await client.get<Response<User>>('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getUser 함수', e);
  }
};

export const writeRequest = async (writeRequestDto: WriteRequest) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.post<Response<WriteResponse>>(
      '/user/qna',
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
      writeRequestDto,
    );
    return response.data.data;
  } catch (error) {
    console.log('여기는 writeRequest 함수', error);
  }
};

export const changeNickname = async (nickname: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.patch<Response<User>>(
      '/user/nickname',
      {nickname: nickname},
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      }
    );
    return response.data.code;
  } catch (error: any) {
    const errorCode = error.response.data.code;
    return errorCode;
  }
};

export const changeMajor = async (departmentId: number) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.patch<Response<User>>(
      '/user/department',
      {departmentId: departmentId},
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      }
    );
    return response.data.code;
  } catch (error: any) {
    const errorCode = error.response.data.code;
    return errorCode;
  }
};

export const getNoticeList = async (page: number) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(
      `/notices?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data.content;
  } catch (e) {
    console.log("여기는 getNoticeList 함수", e);
  }
}

export const getNotice = async (boardId: number, page: number, sort: string = "createdAt") => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('sort', sort);
    const response = await client.get<AxiosResponse>(
      `/boards/${boardId}?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getCustomBoardList 함수", e);
  }
}