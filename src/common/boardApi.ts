import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from '../classes/Board';
import Response from '../classes/Response';
import BoardDetailDto from '../classes/BoardDetailDto';
import CommentDto, {RecommentDto} from '../classes/CommentDto';
import MyPostDto from '../classes/MyPostDto';
import {DirectionAgreement} from '../classes/Agreement';
import MyCommentDto from '../classes/MyCommentDto';
import {PostWriteDto, PostWriteInfoDto} from '../classes/PostDto';
import {MyPostContentDto} from '../classes/board/MyPostDto';

export const getPinnedBoardList = async () => {
  let boardList: Board[] = [];
  try {
    const officialResponse = await client.get<Response<Board[]>>(
      `/boards/pin?type=OFFICIAL`,
    );
    officialResponse.data.data.forEach(b => (b.isOfficial = true));
    boardList = boardList.concat(officialResponse.data.data);
    const customResponse = await client.get<Response<Board[]>>(
      `/boards/pin?type=PUBLIC`,
    );
    customResponse.data.data.forEach(b => (b.isOfficial = false));
    boardList = boardList.concat(customResponse.data.data);
    return boardList;
  } catch (e) {
    console.log('여기는 getPinnedBoardList 함수', e);
  }
};

export const getOfficialBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', 'OFFICIAL');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getOfficialBoardList 함수', e);
  }
};

export const getDepartmentBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', 'DEPARTMENT');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getDepartmentBoardList 함수', e);
  }
};

export const getCustomBoardList = async () => {
  try {
    const params = new URLSearchParams();
    params.append('type', 'PUBLIC');
    const response = await client.get<Response<Board[]>>(`/boards?${params}`);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getCustomBoardList 함수', e);
  }
};

export const toggleBoardPin = async (boardId: number) => {
  try {
    const response = await client.post<AxiosResponse>(`/boards/${boardId}/pin`);
    console.log(response.data);
    return true;
  } catch (e) {
    console.log('여기는 toggleBoardPin 함수', e);
    return false;
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
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getCustomBoardList 함수', e.response.data);
    return e.response.data;
  }
};

export const getReportReason = async () => {
  try {
    const response = await client.get<Response<Board>>(
      `/contract/report-reasons`,
    );
    return response.data.data;
  } catch (e) {
    console.log('여기는 getReportReason 함수', e);
  }
};

export const createBoard = async (
  name: string,
  introduction: string,
  hotable: boolean,
) => {
  try {
    const response = await client.post<Response<Board>>('/boards', {
      name: name,
      introduction: introduction,
      hotable: hotable,
    });
    console.log('createBoard 함수 성공', response.data);
    return response.data.data;
  } catch (e) {
    console.log('createBoard 함수 실패', e.response.data);
    return e.response.data.status;
  }
};

export const updateBoard = async (
  boardId: number,
  introduction: string,
  hotable: boolean,
) => {
  try {
    console.log(hotable);
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
    console.log(response.data.data);
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
    console.log(response.data.data);
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
  } catch (e) {
    console.log('reportBoard 함수 실패', e.response.data);
    return e.response.data;
  }
};
// 게시글 상세
export const getPosts = async (postId: number) => {
  try {
    const response = await client.get<Response<null>>(`/posts/${postId}`);
    console.log('getPosts 함수 성공', response.data);
    return response.data.data;
  } catch (e) {
    console.log('여기는 getPosts 함수', e.response.data);
    return e.response.data;
  }
};
// 게시글 공감
export const setPostLike = async (postId: number) => {
  try {
    const response = await client.post<Response<null>>(`/posts/${postId}/like`);
    return true;
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
// TODO: postId 쉼표 구분으로 여러개 받아야함
export const deletePosts = async (postId: number) => {
  try {
    const response = await client.delete<Response<null>>(`/posts/${postId}`);
    return true;
  } catch (e) {
    console.log('여기는 deletePosts 함수', e);
    return false;
  }
};

// 댓글
export const getComments = async (postId: number, page: number) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await client.get<AxiosResponse>(
      `/posts/${postId}/comments?${params}`,
    );
    return response.data.data.content;
  } catch (e) {
    console.log('여기는 getComments 함수', e);
  }
};
// 댓글 생성
export const addComment = async (
  postId: number,
  content: string,
  isAnonymous: boolean,
) => {
  try {
    console.log(postId, content, '익명여부:', isAnonymous);
    const response = await client.post<Response<CommentDto>>('/comments', {
      postId: postId,
      content: content,
      isAnonymous: isAnonymous,
    });
    console.log('addComment 함수 성공', response.data);
    return 0;
  } catch (e) {
    console.log('addComment 함수 실패', e.response.data);
    return e.response.data.status;
  }
};
// 대댓글 생성
export const addRecomment = async (
  postId: number,
  parentId: number,
  content: string,
  isAnonymous: boolean,
) => {
  try {
    console.log(postId, content, parentId, '익명여부:', isAnonymous);
    const response = await client.post<Response<RecommentDto>>(
      `/comments/${parentId}`,
      {
        postId: postId,
        parentId: parentId,
        content: content,
        isAnonymous: isAnonymous,
      },
    );
    console.log('addRecomment 함수 성공', response.data);
    return 0;
  } catch (e) {
    console.log('addRecomment 함수 실패', e.response.data);
    return e.response.data.status;
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
    return response.data;
  } catch (error) {
    console.log(error);
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
