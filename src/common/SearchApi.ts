import Response from '../classes/Response';
import client from './client';
import {SearchBoard, SearchPost} from '../classes/Search';

export const getBoardSearch = async (searchWord: string) => {
  try {
    const response = await client.get<Response<SearchBoard[]>>(
      `/search/boards?keyword=${searchWord}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('게시판 검색 실패', error);
  }
};

export const getPostSearch = async (searchWord: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/posts?keyword=${searchWord}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('게시글 검색 실패', error);
  }
};
