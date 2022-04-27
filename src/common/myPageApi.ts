import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosResponse} from 'axios';
import User from '../classes/User';
import Response from '../classes/Response';
import WriteRequest from '../classes/WriteRequest';
import WriteResponse from '../classes/WriteResponse';
import ProfileImageResponseDto from '../classes/ProfileImageResponseDto';

export const getUser = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await client.get<Response<User>>('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('accessToken:', accessToken)
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

export const uploadProfileImage = async (image: any) => {
  console.log("인자로 받은 image는", image);
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const formData = new FormData();
    const data = {uri: image.uri, name: image.name, type: image.type};
    formData.append("profileImage", data);

    const response = await client.post<Response<ProfileImageResponseDto>>(
      '/upload/profileImage',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log("사진 업로드 response는", response.data);
    return response.data.data.url;
  } catch (error: any) {
    const errorCode = error.response.data.code;
    console.log("사진 업로드 실패", error.response);
    return errorCode;
  }
};

export const changePassword = async (password: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.patch<Response<User>>(
      '/user/password',
      {password: password},
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

export const getNotice = async (noticeId: number) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    const response = await client.get<AxiosResponse>(
      `/notices/${noticeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getNotice 함수", e);
  }
}
export const getAgreementsWithDate = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.get<AxiosResponse>(
      `/user/agreement`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getAgreementsWithDate함수", e);
  }
}

export const getUsageRestrictions = async (page: number) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(
      `/user/blinds?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data.content;
  } catch (e) {
    console.log("여기는 getUsageRestrictions 함수", e);
  }
}