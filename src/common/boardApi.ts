import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from '../classes/Board';
import Response from '../classes/Response';
import BoardDetailDto from '../classes/BoardDetailDto';
import CommentDto from '../classes/CommentDto';
export const getPinnedBoardList = async () => {
  let boardList: Board[] = [];
  try {
    const officialResponse = await client.get<Response<Board[]>>(`/boards/pin?type=1`);
    officialResponse.data.data.forEach(b => (b.isOfficial = true));
    boardList = boardList.concat(officialResponse.data.data);
    const customResponse = await client.get<Response<Board[]>>(`/boards/pin?type=0`);
    customResponse.data.data.forEach(b => (b.isOfficial = false));
    boardList = boardList.concat(customResponse.data.data);
    return boardList;
  } catch (e) {
    console.log("여기는 getPinnedBoardList 함수", e);
  }
};

export const getOfficialBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', '1');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response.data.data;
  } catch (e) {
    console.log("여기는 getOfficialBoardList 함수", e);
  }
};

export const getDepartmentBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', '2');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response.data.data;
  } catch (e) {
    console.log("여기는 getDepartmentBoardList 함수", e);
  }
};

export const getCustomBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', '0');
    const response = await client.get<Response<Board[]>>( `/boards?${params}`);
    return response.data.data;
  } catch (e) {
    console.log("여기는 getCustomBoardList 함수", e);
  }
};

export const toggleBoardPin = async (boardId: number) => {
  try {
    const response = await client.post<AxiosResponse>(
      `/boards/${boardId}/pin`
    );
    console.log(response.data);
    return true;
  } catch (e) {
    console.log("여기는 toggleBoardPin 함수", e);
    return false;
  }
};

export const getBoardDetail = async (boardId: number, page: number, sort: string = "createdAt") => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('sort', sort);
    const response = await client.get<Response<BoardDetailDto>>(
      `/boards/${boardId}?${params}`
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getCustomBoardList 함수", e);
  }
}

export const getPosts = async (postId: number) => {
  try {
    const response = await client.get<AxiosResponse>(
      `/posts/${postId}`
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getPosts 함수", e);
  }
};

export const getComments = async (postId: number, page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(
      `/posts/${postId}/comments?${params}`
    );
    return response.data.data.content;
  } catch (e) {
    console.log("여기는 getComments 함수", e);
  }
};

export const addComment = async (postId: number, content: string, isAnonymous: boolean) => {
  try {
    console.log(postId, content, '익명여부:', isAnonymous)
    const response = await client.post<Response<CommentDto>>(
      '/comments',
      {postId: postId, content: content, isAnonymous: isAnonymous},
    );
    console.log('addComment 함수 성공', response.data)
    return 0;
  } catch (e: any) {
    console.log('addComment 함수 실패', e.response.data);
    return e.response.data.status;
  }
};

export const setCommentLike = async (commetId: number) => {
  try {
    const response = await client.post<Response<null>>(
      `/comments/${commetId}/like`
    );
    console.log(response.data);
    return true;
  } catch (e) {
    console.log("여기는 setCommentLike 함수", e);
    return false;
  }
};