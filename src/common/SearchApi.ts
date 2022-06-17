import Response from '../classes/Response';
import client from './client';
import {SearchBoardDto, SearchPostDto} from '../classes/SearchDto';

export const getBoardSearch = async (searchWord: string) => {
  try {
    const response = await client.get<Response<SearchBoardDto[]>>(
      `/search/boards?keyword=${searchWord}`,
    );
    console.log('게시판 검색 : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('게시판 검색 실패', error);
  }
};

export const getPostSearch = async (searchWord: string) => {
  try {
    const response = await client.get<Response<SearchPostDto[]>>(
      `/search/posts?keyword=${searchWord}`,
    );
    console.log('게시글 검색 : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('게시글 검색 실패', error);
  }
};
