import Response from '../classes/Response';
import client from './client';
import {SearchBoard, SearchPost} from '../classes/Search';

export const getBoardSearch = async (searchWord: string) => {
  try {
    const response = await client.get<Response<SearchBoard[]>>(
      `/search/boards?keyword=${searchWord}&page=0&sort=pinCount`,
    );
    return response.data.data;
  } catch (error) {
    console.log('게시판 검색 실패', error);
  }
};

export const getPostSearch = async (searchWord: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/posts?keyword=${searchWord}&page=0&sort=createdAt`,
    );
    // console.log('api 게시판탭에서 검색', searchWord, response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('게시글 검색 실패', error);
  }
};

export const getPostSearchInBoard = async (searchWord: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/1/posts?keyword=${searchWord}&page=0&sort=createdAt`,
    );
    // console.log('api 특정 게시판에서 검색', searchWord, response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('특정 게시판 내 게시글 검색 실패', error);
  }
}
