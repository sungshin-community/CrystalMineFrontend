import Response from '../classes/Response';
import client from './client';
import {BoardSearchResult, SearchBoard, SearchComment, SearchPost} from '../classes/Search';

export const searchBoards = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<BoardSearchResult>>(
      `/search/boards?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data;
  } catch (error: any) {
    console.log('게시판 검색 실패', error);
    return error.response.data;
  }
};

export const searchPosts = async (searchWord: string, page: number, sort: string) => {
  console.log("여기는 검색 API. 검색어는", searchWord)
  try {
    const response = await client.get<Response<SearchPost[]>>(
      `/search/posts?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    console.log(response.data.data)
    return response.data;
  } catch (error: any) {
    console.log('게시글 검색 실패', error);
    return error.response.data;
  }
};

export const searchPostsInBoard = async (boardId: number, searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchPost>>(
      `/search/${boardId}/posts?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data;
  } catch (error: any) {
    console.log('특정 게시판 내 게시글 검색 실패', error.response);
    return error.response.data;
  }
}

export const searchMyPosts = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchPost>>(
      `/search/myposts?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data;
  } catch (error: any) {
    console.log('내가 쓴 게시글 검색 실패', error);
    return error.response.data;
  }
}

export const searchMyComments = async (searchWord: string, page: number, sort: string) => {
  try {
    const response = await client.get<Response<SearchComment>>(
      `/search/mycomments?keyword=${searchWord}&page=${page}&sort=${sort}`,
    );
    return response.data;
  } catch (error: any) {
    console.log('내가 쓴 댓글 검색 실패', error);
    return error.response.data;
  }
}

export const searchScrapedPosts = async (searchWord: string, page: number) => {
  try {
    const response = await client.get<Response<SearchPost>>(
      `/search/scraps?keyword=${searchWord}&page=${page}&sort=createdAt`,
    );
    return response.data;
  } catch (error: any) {
    console.log('스크랩 검색 실패', error);
    return error.response.data;
  }
}
