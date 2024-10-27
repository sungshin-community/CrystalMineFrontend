import client from './client';
import {AxiosResponse} from 'axios';

export const postCommentAdopt = async (
  ptCommentId: number,
  ptPostId: number,
) => {
  try {
    const response = await client.post<AxiosResponse>(
      '/pantheon-comments/select',
      {
        ptCommentId,
        ptPostId,
      },
    );
    console.log('궁금해요 댓글 채택 response:', response);
    return response.data;
  } catch (e: any) {
    console.log('postCommentAdopt 함수', e);
    return e.response;
  }
};

export const getCuriousList = async () => {
  try {
    const response = await client.get<AxiosResponse>('/pantheon-questions');
    console.log('궁금해요 글 목록 조회 response:', response);
    return response.data;
  } catch (e: any) {
    console.log('getCuriousList 함수', e);
    return e.response;
  }
};

export const getCuriousDetail = async (id: number) => {
  try {
    const response = await client.get<AxiosResponse>(
      `/pantheon-questions/${id}`,
    );
    console.log('궁금해요 글 상세 조회 response:', response);
    return response.data;
  } catch (e: any) {
    console.log('getCuriousDetail 함수', e);
    return e.response;
  }
};

export const getCuriousComment = async (id: number) => {
  try {
    const response = await client.get<AxiosResponse>(
      `/pantheon-questions/${id}/comments`,
    );
    console.log('궁금해요 댓글 조회 response:', response);
    return response.data;
  } catch (e: any) {
    console.log('getCuriousComment 함수', e);
    return e.response;
  }
};
