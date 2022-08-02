import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosResponse} from 'axios';
import User from '../classes/User';
import Response from '../classes/Response';
import QuestionWriteRequest from '../classes/QuestionWriteRequest';
import QuestionWriteResponse from '../classes/QuestionWriteResponse';
import ProfileImageResponseDto from '../classes/ProfileImageResponseDto';

export const getUser = async () => {
  try {
    const response = await client.get<Response<User>>('/user');
    console.log(response.data.data);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getUser 함수', e);
    return false;
  }
};

export const writeQuestion = async (
  title: string,
  content: string,
  images?: any,
) => {
  try {
    const formData = new FormData();
    images.map((image: any, index: number) => {
      const photo = {
        uri: image.uri,
        name: `${index}.jpg`,
        type: 'multipart/form-data',
      };
      formData.append('images', photo);
    });
    formData.append('title', title);
    formData.append('content', content);
    const response = await client.post<Response<QuestionWriteResponse>>(
      `/questions`,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    return response.data.data;
  } catch (error) {
    console.log('여기는 writeQuestion 함수', error);
  }
};

export const uploadProfileImage = async (image: any) => {
  try {
    const formData = new FormData();
    const data = {
      uri: image.uri,
      name: 'photo.png',
      type: 'multipart/form-data',
    };
    formData.append('image', data);
    const response = await client.post<Response<ProfileImageResponseDto>>(
      '/user/profile-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('사진 업로드 response는', response.data);
    return response.data;
  } catch (error) {
    const errorCode = error.response.data;
    console.log('사진 업로드 실패', error.response);
    return errorCode;
  }
};

export const setDefaultProfileImage = async () => {
  try {
    const response = await client.patch<Response<User>>(
      '/user/profile-image-default',
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const changePassword = async (password: string) => {
  try {
    const response = await client.patch<Response<User>>('/user/password', {
      password: password,
    });
    return response.data.code;
  } catch (error) {
    const errorCode = error.response.data.code;
    return errorCode;
  }
};

export const changeNickname = async (nickname: string) => {
  try {
    const response = await client.patch<Response<User>>('/user/nickname', {
      nickname: nickname,
    });
    return response.data.code;
  } catch (error) {
    const errorCode = error.response.data.code;
    return errorCode;
  }
};

export const changeMajor = async (departmentId: number) => {
  try {
    const response = await client.patch<Response<User>>('/user/department', {
      departmentId: departmentId,
    });
    return response.data.code;
  } catch (error) {
    const errorCode = error.response.data.code;
    return errorCode;
  }
};

export const getNoticeList = async (page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(`/notices?${params}`);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getNoticeList 함수', e);
  }
};

export const getNotice = async (noticeId: number) => {
  try {
    const params = new URLSearchParams();
    const response = await client.get<AxiosResponse>(`/notices/${noticeId}`);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getNotice 함수', e);
  }
};
export const getAgreementsWithDate = async () => {
  try {
    const response = await client.get<AxiosResponse>('/user/agreement');
    return response.data.data;
  } catch (e) {
    console.log('여기는 getAgreementsWithDate함수', e);
  }
};

export const getUsageRestrictions = async (page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(`/user/blinds?${params}`);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getUsageRestrictions 함수', e);
  }
};

export const checkPassword = async (password: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.post<Response<User>>(
      '/user/check-password',
      {password: password},
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );
    console.log('~', response.data);
    return response.data.code;
  } catch (error) {
    const errorCode = error.response.data.code;
    console.log('~~', errorCode);

    return errorCode;
  }
};

export const getQuestionList = async (page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(`/questions?${params}`);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getQuestionList 함수', e);
  }
};

export const getQuestion = async (answerId: number) => {
  try {
    const params = new URLSearchParams();
    const response = await client.get<AxiosResponse>(`/questions/${answerId}`);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getQuestion 함수', e);
  }
};

export async function deleteQuestions(questionIds: number[]) {
  try {
    console.log(questionIds);
    const questionIdListStr = questionIds.join(',');
    const response = await client.delete<AxiosResponse>(
      `/questions/${questionIdListStr}`,
    );
    console.log(response.data.data);
    return response.data;
  } catch (e) {
    console.log('여기는 deleteQuestions 함수', e);
  }
}
