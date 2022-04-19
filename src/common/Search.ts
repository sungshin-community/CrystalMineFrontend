import Response from '../classes/Response';
import client from './client';
import {SearchBoard, SearchPost} from '../classes/Search';

export const getBoardSearch = async () => {
  try {
    const response = await client.get<Response<SearchBoard[]>>(
      '/search/boards',
    );
    console.log('게시판 검색 : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('게시판 검색 실패', error);
  }
};

export const getPostSearch = async () => {
  try {
    const response = await client.get<Response<SearchPost[]>>('/search/posts');
    console.log('게시글 검색 : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('게시글 검색 실패', error);
  }
};
