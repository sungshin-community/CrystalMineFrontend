import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from '../classes/Board';
import Response from '../classes/Response';
import BoardDetailDto, {BoardHotPostDto} from '../classes/BoardDetailDto';
import CommentDto, {RecommentDto} from '../classes/CommentDto';
import MyPostDto from '../classes/MyPostDto';
import {DirectionAgreement} from '../classes/Agreement';
import MyCommentDto from '../classes/MyCommentDto';
import PostDto, {PostWriteDto, PostWriteInfoDto} from '../classes/PostDto';
import {MyPostContentDto} from '../classes/board/MyPostDto';

export const getPinnedOfficialBoardList = async () => {
  try {
    const response = await client.get<Response<Board[]>>(
      '/boards/pin?type=OFFICIAL',
    );
    return response;
  } catch (e: any) {
    console.log('여기는 getPinnedOfficialBoardList 함수', e);
    return e.response;
  }
};

export const getPinnedDepartmentBoardList = async () => {
  try {
    const response = await client.get<Response<Board[]>>(
      '/boards/pin?type=DEPARTMENT',
    );
    return response;
  } catch (e: any) {
    console.log('여기는 getPinnedDepartmentBoardList 함수', e);
    return e.response;
  }
};

export const getPinnedPublicBoardList = async () => {
  try {
    const response = await client.get<Response<Board[]>>(
      '/boards/pin?type=PUBLIC',
    );
    return response;
  } catch (e: any) {
    console.log('여기는 getPinnedPublicBoardList 함수', e);
    return e.response;
  }
};

export const getOfficialBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', 'OFFICIAL');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response;
  } catch (e: any) {
    console.log('여기는 getOfficialBoardList 함수', e);
    return e.response;
  }
};

export const getDepartmentBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', 'DEPARTMENT');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response;
  } catch (e: any) {
    console.log('여기는 getDepartmentBoardList 함수', e);
    return e.response;
  }
};

export const getCustomBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', 'PUBLIC');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response;
  } catch (e: any) {
    console.log('여기는 getCustomBoardList 함수', e);
    return e.response;
  }
};

export const toggleBoardPin = async (boardId: number) => {
  try {
    const response = await client.post<AxiosResponse>(`/boards/${boardId}/pin`);
    console.log('고정/고정해제 response:', response.data.data);
    return response.data.data;
  } catch (e: any) {
    console.log('여기는 toggleBoardPin 함수', e);
    return e.response;
  }
};

export const getBoardirectionAgreements = async () => {
  try {
    const response = await client.get<Response<DirectionAgreement[]>>(
      '/boards/directions',
    );
    console.log(response.data);
    return response.data.data;
  } catch {
    return [];
  }
};

export const getBoardInfo = async (boardId: number) => {
  try {
    const response = await client.get<Response<Board>>(`/boards/${boardId}`);
    console.log('여기는 getBoardInfo 함수', response.data.data);

    return response.data.data;
  } catch (e) {
    console.log('여기는 getBoardInfo 함수', e);
  }
};

// 게시글 목록
export const getBoardDetail = async (
  boardId: number,
  page: number,
  sort: string,
) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('sort', sort);
    const response = await client.get<Response<BoardDetailDto>>(
      `/boards/${boardId}/posts?${params}`,
    );
    console.log('여기는 getBoardInfo 함수', response.data.data);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getCustomBoardList 함수', e.response.data);
    return e.response.data;
  }
};

// 광고 게시글 목록
export const getAdBoardPost = async (boardId: number, page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<Response<BoardDetailDto>>(
      `/boards/${boardId}/ad-board/posts?${params}`,
    );
    console.log('여기는 getAdBoardPost 함수', response.data.data);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getAdBoardPost 함수', e.response.data);
    return e.response.data;
  }
};

// 광고 게시글 관리자 여부 확인
export const checkIsAdminForAdBoardPost = async (boardId: number) => {
  try {
    const response = await client.get<Response<boolean>>(
      `/boards/${boardId}/ad-board/posts/is-admin`,
    );
    console.log('여기는 checkIsAdminForAdBoardPost 함수', response.data);
    return response.data;
  } catch (e) {
    console.log(
      '여기는 checkIsAdminForAdBoardPost 함수 에러',
      e.response?.data || e,
    );
    // 권한이 없는 경우 기본적으로 false 반환
    return {success: false, data: false};
  }
};

// 중간 광고 게시글
export const getRandomMidAd = async (boardId?: number) => {
  try {
    const response = await client.get<Response<any>>(`/boards/ad-post`);
    console.log('여기는 getRandomMidAd 함수', response.data.data);
    return response.data.data; // 전체 응답 객체 반환
  } catch (e) {
    console.log('여기는 getRandomMidAd 함수', e.response);
    return e.response;
  }
};

// 게시판 내 최신 게시판 조회
export const getCurrentPost = async (page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<Response<any>>(
      `/boards/new-board/posts?${params}`,
    );
    //console.log('여기는 getCurrentPost 함수', response.data.data.content);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getCurrentPost 함수', e.response);
    return e.response;
  }
};

//게시판 내 인기 게시물
export const getBoardHotPost = async (boardId: number) => {
  try {
    const response = await client.get<Response<BoardHotPostDto>>(
      `/boards/${boardId}/hot-post`,
    );
    console.log('여기는 getBoardHotPost 함수', response.data);
    return response.data;
  } catch (e) {
    console.log('여기는 getBoardHotPost 함수', e.response.data);
    return e.response.data;
  }
};

export const getReportReason = async () => {
  try {
    const response = await client.get<Response<Board>>(
      `/contract/report-reasons`,
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log('여기는 getReportReason 함수', e.responde.data);
    return e.response.data;
  }
};

export const getSecondReportReason = async () => {
  try {
    const response = await client.get<Response<Board>>(`/report`);
    console.log('getSecondReportReason', response.data);
    return response.data;
  } catch (e) {
    console.log('여기는 getSecondReportReason 함수', e.responde.data);
    return e.response.data;
  }
};

export enum BoardContentType {
  TYPE1 = 'TYPE1', // 제목 + 본문
  TYPE2 = 'TYPE2', // 제목 + 본문 + 사진
  TYPE3 = 'TYPE3', // 제목 + 사진
  TYPE4 = 'TYPE4', // 기존 게시글용
}

export const createBoard = async (
  name: string,
  introduction: string,
  hotable: boolean,
  type: BoardContentType,
) => {
  try {
    const response = await client.post<Response<Board>>('/boards', {
      name: name,
      introduction: introduction,
      hotable: hotable,
      type: type,
    });
    console.log('게시판 생성 hotable', hotable);
    console.log('createBoard 함수 성공', response.data);
    return response.data;
  } catch (e) {
    console.log('createBoard 함수 실패', e.response.data);
    return e.response.data;
  }
};

export const updateBoard = async (
  boardId: number,
  introduction: string,
  hotable: boolean,
) => {
  try {
    console.log('게시판 수정 hotable', hotable);
    const response = await client.patch<Response<Board>>(`/boards/${boardId}`, {
      introduction: introduction,
      hotable: hotable,
    });
    console.log('updateBoard 함수 성공', response.data);
    return response.data.data;
  } catch (e) {
    console.log('updateBoard 함수 실패', e.response.data);
    return e.response.data.status;
  }
};

export async function getMyPostList(
  page: number = 0,
  sort: string = 'createdAt',
) {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('sort', sort);
    const response = await client.get<Response<MyPostContentDto>>(
      `/posts?${params}`,
    );
    // console.log(response.data.data);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getMyPostList 함수', e);
  }
}

export async function deleteMyPosts(postIds: number[]) {
  try {
    const postIdListStr = postIds.join(',');
    const response = await client.delete<AxiosResponse>(
      `/posts/${postIdListStr}`,
    );
    console.log(response.data.data);
    return response.data;
  } catch (e) {
    console.log('여기는 deleteMyPosts 함수', e);
  }
}

export async function deleteMyComments(commendIds: number[]) {
  try {
    const commendIdListStr = commendIds.join(',');
    const response = await client.delete<AxiosResponse>(
      `/comments/${commendIdListStr}`,
    );
    return response.data;
  } catch (e) {
    console.log('여기는 deleteMyComments 함수', e);
  }
}

export async function cancelScrapedPosts(postIds: number[]) {
  try {
    const postIdListStr = postIds.join(',');
    const response = await client.delete<AxiosResponse>(
      `/posts/scrap/${postIdListStr}`,
    );
    console.log(response.data.data);
    return response.data;
  } catch (e) {
    console.log('여기는 cancelScrapedPosts 함수', e);
  }
}

export async function getScrapedPostList(page: number = 0) {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<Response<MyPostDto>>(
      `/posts/scrap?${params}`,
    );
    console.log(response.data.data);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getScrapedPostList 함수', e);
  }
}

export async function getMyCommentList(
  page: number,
  sort: string = 'createdAt',
) {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('sort', sort);
    const response = await client.get<Response<MyCommentDto>>(
      `/comments?${params}`,
    );
    console.log(response.data.data);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getMyCommentList 함수', e);
  }
}
// HOT 게시판 글 목록
export const getHotBoardPosts = async (page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<Response<BoardDetailDto>>(
      `/boards/hot-board/posts?${params}`,
    );
    console.log('getHotBoardPosts', response.data.data);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getHotBoardPosts 함수', e.response.data);
    return e.response.data;
  }
};

//게시판 신고
export const reportBoard = async (
  boardId: number,
  reasonId: number,
  detail?: string,
) => {
  try {
    const response = await client.post<Response<Board>>(
      `/boards/${boardId}/report`,
      {reasonId: reasonId, detail: detail},
    );
    console.log('reportBoard 함수 성공', response.data);
    return response.data;
  } catch (e: any) {
    console.log('reportBoard 함수 실패', e.response.data);
    return e.response.data;
  }
};
// 게시글 상세
export const getPosts = async (postId: number) => {
  try {
    const response = await client.get<Response<null>>(`/posts/${postId}`);
    console.log('getPosts 함수 성공', response.data);
    return response;
  } catch (e) {
    console.log('여기는 getPosts 함수', e.response.data);
    return e.response;
  }
};

// 광고게시글 상세
export const getAdPosts = async (postAdId: number) => {
  try {
    const response = await client.get<Response<null>>(`/post-ad/${postAdId}`);
    console.log('getAdPosts 함수 성공', response.data);
    return response;
  } catch (e) {
    console.log('여기는 getAdPosts 함수', e.response.data);
    return e.response;
  }
};

export const getPostByComment = async (commentId: number) => {
  try {
    const response = await client.get<Response<PostDto>>(
      `/posts/by/${commentId}`,
    );
    return response.data.data;
  } catch (error: any) {
    console.log('여기는 getAlertsByComment 함수', error.response.data);
  }
};
// 게시글 공감
export const setPostLike = async (postId: number) => {
  try {
    const response = await client.post<Response<null>>(`/posts/${postId}/like`);
    console.log('좋아요 응답:', response.data);
    return response.data;
  } catch (e) {
    console.log('여기는 setPostLike 함수', e);
    return false;
  }
};
// 게시글 스크랩
export const setPostScrap = async (postId: number) => {
  try {
    const response = await client.post<Response<null>>(
      `/posts/${postId}/scrap`,
    );
    return true;
  } catch (e) {
    console.log('여기는 setPostScrap 함수', e);
    return false;
  }
};
// 이용자 차단, 이용자 뮤트
export const setUserMute = async (postId: number) => {
  try {
    const response = await client.post<Response<null>>(`/block/${postId}`);
    return response;
  } catch (e) {
    console.log('여기는 setUserMute 함수', e.response);
    return e.response;
  }
};
// 게시글 신고
export const reportPost = async (
  postId: number,
  reasonId: number,
  detail?: string,
) => {
  try {
    const response = await client.post<Response<Board>>(
      `/posts/${postId}/report`,
      {reasonId: reasonId, detail: detail},
    );
    console.log('reportPost 함수 성공', response.data);
    return response.data;
  } catch (e) {
    console.log('reportPost 함수 실패', e.response.data);
    return e.response.data;
  }
};
// 게시글 삭제
export const deletePosts = async (postId: number) => {
  try {
    const response = await client.delete<Response<null>>(`/posts/${postId}`);
    return true;
  } catch (e) {
    console.log('여기는 deletePosts 함수', e);
    return false;
  }
};
// 광고 게시글 삭제
export const deleteAdPosts = async (postAdId: number) => {
  try {
    const response = await client.delete<Response<null>>(
      `/post-ad/${postAdId}`,
    );
    return true;
  } catch (e) {
    console.log('여기는 deleteAdPosts 함수', e);
    return false;
  }
};

// 내 이모티콘 조회
export const getMyEmoticons = async () => {
  try {
    const response = await client.get<AxiosResponse>(`/emoticons/my`);
    console.log('이모티콘list', response.data);
    return response.data;
  } catch (e) {
    console.log('getMyEmoticons 함수', e);
  }
};

//전체 이모티콘 조회
export const getEmoticons = async () => {
  try {
    const response = await client.get<AxiosResponse>(`/emoticons`);
    console.log('전체이모티콘list', response.data);
    return response.data;
  } catch (e) {
    console.log('getEmoticons 함수', e);
  }
};

// 수정광산 이모티콘 구매하기
export const buyEmoticons = async (emoticonId: number) => {
  try {
    console.log('이모티콘 구매하기', emoticonId);
    const response = await client.post<AxiosResponse>(
      `/emoticons/${emoticonId}`,
    );
    console.log('이모티콘 구매', response.data);
    return response.data;
  } catch (e) {
    console.log('buyEmoticons 함수', e.response.status);
    return e.response;
  }
};
//특정이모티콘 조회
export const getEmoticonDetail = async (emoticonId: number) => {
  try {
    const response = await client.get(`/emoticons/${emoticonId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
// 댓글
export const getComments = async (postId: number /*, page: number*/) => {
  try {
    // const params = new URLSearchParams();
    // params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(
      `/posts/${postId}/comments`,
    );
    //console.log('댓글', response.data.data.content);
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getComments 함수', e.response.data);
  }
};
// 댓글 생성
export const addComment = async (
  postId: number,
  content: string,
  isAnonymous: boolean,
  emoticonId: number,
) => {
  try {
    console.log(
      '댓글 달기',
      postId,
      content,
      '익명여부:',
      isAnonymous,
      emoticonId,
    );
    const response = await client.post<Response<CommentDto>>('/comments', {
      postId: postId,
      content: content,
      isAnonymous: isAnonymous,
      emoticonId: emoticonId,
    });
    console.log('addComment 함수 성공', response.data);
    return response;
  } catch (e: any) {
    console.log('addComment 함수 실패', e.response.data);
    return e.response;
  }
};
// 대댓글 생성
export const addRecomment = async (
  postId: number,
  parentId: number,
  content: string,
  isAnonymous: boolean,
  emoticonId: number,
) => {
  try {
    console.log(
      '대댓글 추가',
      postId,
      content,
      parentId,
      '익명여부:',
      isAnonymous,
      emoticonId,
    );
    const response = await client.post<Response<RecommentDto>>(
      `/comments/${parentId}`,
      {
        postId: postId,
        parentId: parentId,
        content: content,
        isAnonymous: isAnonymous,
        emoticonId: emoticonId,
      },
    );
    console.log('addRecomment 함수 성공', response.data);
    return response;
  } catch (e: any) {
    console.log('addRecomment 함수 실패', e.response.data);
    return e.response;
  }
};
// 댓글, 대댓글 공감
export const setCommentLike = async (commetId: number) => {
  try {
    const response = await client.post<Response<null>>(
      `/comments/${commetId}/like`,
    );
    return true;
  } catch (e) {
    console.log('여기는 setCommentLike 함수', e);
    return false;
  }
};
// 댓글, 대댓글 신고
export const reportComment = async (
  commentId: number,
  reasonId: number,
  detail?: string,
) => {
  try {
    const response = await client.post<Response<CommentDto>>(
      `/comments/${commentId}/report`,
      {reasonId: reasonId, detail: detail},
    );
    console.log('reportComment 함수 성공', response.data);
    return response.data;
  } catch (e) {
    console.log('reportComment 함수 실패', e.response.data);
    return e.response.data;
  }
};
// 댓글, 대댓글 삭제
export const deleteComment = async (commentId: number) => {
  try {
    const response = await client.delete<Response<CommentDto>>(
      `/comments/${commentId}`,
    );
    return true;
  } catch (e) {
    console.log('여기는 deleteComment 함수', e);
    return false;
  }
};
// 게시글 생성
export const postWritePost = async (
  boardId: number,
  title: string,
  content: string,
  isAnonymous: boolean,
  images?: any,
) => {
  try {
    const formData = new FormData();
    console.log(
      'api 함수 호출 전: boardId: ',
      boardId,
      'title',
      title,
      'content',
      content,
      'isAnonymous',
      isAnonymous,
      'images',
      images,
    );
    images?.map((image: any, index: number) => {
      const photo = {
        uri: image.uri,
        name: `${index}.jpg`,
        type: 'multipart/form-data',
      };
      formData.append('images', photo);
    });
    formData.append('boardId', boardId);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isAnonymous', isAnonymous);
    const response = await client.post<Response<PostWriteDto>>(
      '/posts',
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    console.log(response.data);
    return response;
  } catch (error: any) {
    console.log(error.response);
    return error.response;
  }
};
// 광고 게시글 생성
export const adWritePost = async (
  boardId: number,
  title: string,
  content: string,
  storeName: string,
  images?: any,
) => {
  try {
    const formData = new FormData();
    const adPost = {
      boardId,
      title,
      content,
      storeName,
    };
    formData.append('adPost', JSON.stringify(adPost));

    images?.forEach((image: any, index: number) => {
      const photo = {
        uri: image.uri,
        name: `image_${index}.jpg`,
        type: image.type || 'image/jpeg',
      };
      formData.append('images', photo);
    });

    console.log('광고 API 호출 전 데이터: ', adPost, images);
    const response = await client.post<Response<PostWriteDto>>(
      '/post-ad',
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );

    console.log('광고 생성 완료', response.data);
    return response;
  } catch (error: any) {
    console.error('광고 생성 에러', error.response?.data || error.message);
    return error.response;
  }
};

// 게시글 생성 시 필요한 정보 조회
export const getWritePostInfo = async (id: number) => {
  try {
    const response = await client.get<Response<PostWriteInfoDto>>(
      `/posts/info/${id}`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const postBlockMine = async (id: number) => {
  try {
    const response = await client.post(`/block/${id}`);
    console.log('광산 사용자 및 게시글 차단');
  } catch (error: any) {
    console.log('광산 사용자 및 게시글 차단 에러', error);
  }
};
