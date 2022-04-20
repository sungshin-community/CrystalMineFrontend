import Response from '../classes/Response';
import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchBoard, SearchPost} from '../classes/Search';

export const getBoardSearch = async (searchWord: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.get<Response<SearchBoard[]>>(
      `/search/boards?keyword=${searchWord}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('게시판 검색 : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('게시판 검색 실패', error);
  }
};

export const getPostSearch = async (searchWord: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.get<Response<SearchPost[]>>(
      `/search/posts?keyword=${searchWord}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('게시글 검색 : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('게시글 검색 실패', error);
  }
};
