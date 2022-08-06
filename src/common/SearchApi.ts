import Response from '../classes/Response';
import client from './client';
import {SearchBoard, SearchPost} from '../classes/Search';

export const getBoardSearch = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchBoard[]>>(
      `/search/boards?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('게시판 검색 실패', error);
  }
};

export const getPostSearch = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/posts?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('게시글 검색 실패', error);
  }
};

export const getPostSearchInBoard = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/1/posts?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('특정 게시판 내 게시글 검색 실패', error);
  }
}

export const getMyPostSearch = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/myposts?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('내가 쓴 게시글 검색 실패', error);
  }
}

export const getMyCommentSearch = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/mycomments?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('내가 쓴 댓글 검색 실패', error);
  }
}

export const getScrapsSearch = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/scraps?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('스크랩 검색 실패', error);
  }
}