import {AxiosResponse} from 'axios';
import client from './client';

export async function getPantheonAllList(
  cursor: number,
  jobList: string,
  sort: string,
) {
  try {
    const response = await client.get('/pantheon-common/pantheon-all', {
      params: {
        cursor: cursor,
        jobList: jobList,
        sort: sort,
      },
    });
    console.log('판테온 전체 글 목록 조회');
    return response.data.data;
  } catch (error: any) {
    console.error('판테온 전체 글 목록 조회 에러:', error);
  }
}

export async function getPantheonFreeList(
  cursor: number,
  jobList: string,
  sort: string,
) {
  try {
    const response = await client.get('/pantheon-general', {
      params: {
        cursor: cursor,
        jobList: jobList,
        sort: sort,
      },
    });
    console.log('판테온 자유 글 목록 조회');
    return response.data.data;
  } catch (error: any) {
    console.error('판테온 자유 글 목록 조회에러:', error);
  }
}

export const getPantheonCuriousList = async (
  cursor: number,
  jobList: string,
  sort: string,
) => {
  try {
    const response = await client.get('/pantheon-questions', {
      params: {
        cursor: cursor,
        jobList: jobList,
        sort: sort,
      },
    });
    console.log('판테온 궁금해요 글 목록 조회');
    return response.data.data;
  } catch (error: any) {
    console.error('판테온 궁금해요 글 목록 조회 에러', error);
  }
};

export const getPantheonFreeDetail = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-general/${id}`);
    console.log('판테온 자유 글 상세 조회');
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 자유 글 상세 조회 에러', error);
  }
};

export const getPantheonCuriousDetail = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-questions/${id}`);
    console.log('판테온 궁금해요 글 상세 조회');
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 궁금해요 글 상세 조회 에러', error);
  }
};

export const getPantheonReviewDetail = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-reviews/${id}`);
    console.log('판테온 수정후기 글 상세 조회');
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 수정후기 글 상세 조회 에러', error);
  }
};

export const getPantheonFreeComment = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-general/${id}/comments`);
    console.log('판테온 자유 댓글 조회');
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 자유 댓글 조회 에러', error);
  }
};

export const getPantheonCuriousComment = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-questions/${id}/comments`);
    console.log('판테온 궁금해요 댓글 조회');
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 궁금해요 댓글 조회 에러', error);
  }
};

export const getPantheonReviewComment = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-reviews/${id}/comments`);
    console.log('판테온 수정후기 댓글 조회');
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 수정후기 댓글 조회 에러', error);
  }
};

export const postPantheonFree = async (
  content: string,
  isAnonymous: boolean,
  images?: any[],
  title?: string,
) => {
  try {
    const formData = new FormData();
    images?.forEach((image: any, index: number) => {
      const photo = {
        uri: image.uri,
        name: `${index}.jpg`,
        type: 'image/jpeg',
      };
      formData.append('images', photo);
    });
    const questionData = {
      title,
      content,
      isAnonymous,
    };
    formData.append('question', JSON.stringify(questionData));
    await client.post(`/pantheon-general`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log('판테온 자유 게시물 작성');
  } catch (error: any) {
    console.log('판테온 자유 게시물 작성 에러', error);
  }
};

export const postPantheonQurious = async (
  content: string,
  point: number,
  isAnonymous: boolean,
  title?: string,
  images?: any[],
) => {
  try {
    const formData = new FormData();
    images?.forEach((image: any, index: number) => {
      const photo = {
        uri: image.uri,
        name: `${index}.jpg`,
        type: 'image/jpeg',
      };
      formData.append('images', photo);
    });
    const questionData = {
      title,
      content,
      isAnonymous,
      point,
    };
    formData.append('question', JSON.stringify(questionData));
    console.log('게시물 작성 중', formData);
    await client.post(`/pantheon-questions`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log('판테온 궁금해요 게시물 작성');
  } catch (error: any) {
    console.log('판테온 궁금해요 게시물 작성 에러', error);
  }
};

export const postPantheonReview = async (
  category: string,
  content: string,
  isAnonymous: boolean,
  job: string,
  scale: string,
  title: string,
  year: string,
  images?: any[],
) => {
  try {
    const formData = new FormData();
    images?.forEach((image: any, index: number) => {
      const photo = {
        uri: image.uri,
        name: `${index}.jpg`,
        type: 'image/jpeg',
      };
      formData.append('images', photo);
    });
    const reviewData = {
      category,
      content,
      isAnonymous,
      job,
      scale,
      title,
      year,
    };
    formData.append('review', JSON.stringify(reviewData));
    console.log('게시물 작성 중', formData);
    await client.post(`/pantheon-reviews`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log('판테온 수정후기 게시물 작성');
  } catch (error: any) {
    console.log('판테온 수정후기 게시물 작성 에러', error);
  }
};

export const postPantheonScrap = async (id: number) => {
  try {
    await client.post(`/pantheon-common/${id}/scrap`);
    console.log('판테온 게시물 스크랩');
  } catch (error: any) {
    console.log('판테온 게시물 스크랩 에러', error);
  }
};

export const deletePantheonScrap = async (id: number) => {
  try {
    await client.delete(`/pantheon-common/${id}/scrap`);
    console.log('판테온 게시물 언스크랩');
  } catch (error: any) {
    console.log('판테온 게시물 언스크랩 애러', error);
  }
};

export const postPantheonLike = async (id: number) => {
  try {
    await client.post(`/pantheon-common/${id}/like`);
    console.log('판테온 게시물 좋아요');
  } catch (error: any) {
    console.log('판테온 게시물 좋아요 에러', error);
  }
};

export const deleltePantheonLike = async (id: number) => {
  try {
    await client.delete(`/pantheon-common/${id}/like`, {});
    console.log('판테온 게시물 좋아요 삭제');
  } catch (error: any) {
    console.log('판테온 게시물 좋아요 삭제 에러', error);
  }
};

export const postPantheonCommentLike = async (id: number) => {
  try {
    await client.post(`/pantheon-comments/${id}/like`);
    console.log('판테온 댓글 및 대댓글 좋아요');
  } catch (error: any) {
    console.log('판테온 댓글 및 대댓글 좋아요 에러', error);
  }
};

export const deleltePantheonCommentLike = async (id: number) => {
  try {
    await client.delete(`/pantheon-comments/${id}/like`, {});
    console.log('판테온 댓글 및 대댓글 좋아요 삭제');
  } catch (error: any) {
    console.log('판테온 댓글 및 대댓글 좋아요 삭제 에러', error);
  }
};

export const postPantheonComment = async (
  content: string,
  isAnonymous: boolean,
  ptPostId: number,
  emoticonId?: number,
) => {
  try {
    await client.post(`/pantheon-comments`, {
      content: content,
      emoticonId: emoticonId,
      isAnonymous: isAnonymous,
      ptPostId: ptPostId,
    });
    console.log('판테온 댓글 생성');
  } catch (error: any) {
    console.log('판테온 댓글 생성 에러', error);
  }
};

export const postPantheonReComment = async (
  id: number,
  content: string,
  isAnonymous: boolean,
  ptPostId: number,
  emoticonId?: number,
) => {
  try {
    await client.post(`/pantheon-comments/${id}/re-comments`, {
      content: content,
      emoticonId: emoticonId,
      isAnonymous: isAnonymous,
      ptPostId: ptPostId,
    });
    console.log('판테온 대댓글 생성');
  } catch (error: any) {
    console.log('판테온 대댓글 생성 에러', error);
  }
};

export const postPurchaseAdopt = async (id: number) => {
  try {
    const response = await client.post(`/pantheon-comments/${id}/purchase`);
    console.log('판테온 채택 댓글 구매');
    return response;
  } catch (error: any) {
    console.log('판테온 채택 댓글 구매 에러', error);
  }
};

export const postCommentAdopt = async (
  ptCommentId: number,
  ptPostId: number,
) => {
  try {
    await client.post('/pantheon-comments/select', {
      ptCommentId,
      ptPostId,
    });
    console.log('판테온 댓글 채택');
  } catch (error: any) {
    console.log('판테온 댓글 채택 에러', error);
  }
};

/*
export const postPantheonReport = async (
  id: number,
  reasonId: number,
  detail?: string,
) => {
  try {
    console.log('게시물 신고 요청 시작');
    const requestBody = {
      detail: detail || '', // 기본값 제공
      reasonId,
    };

    console.log('API 요청 시작:', `/pantheon-common/${id}/report`);
    console.log('요청 데이터:', requestBody);

    const response = await client.post(
      `/pantheon-common/${id}/report`,
      requestBody,
    );
    console.log('게시물 신고 성공:', response.data);
  } catch (e: any) {
    // 에러를 자세히 출력
    if (e.response) {
      console.error('HTTP 상태 코드:', e.response.status); // 404 등 상태 코드
      console.error('응답 데이터:', e.response.data); // 서버에서 반환한 에러 메시지
      console.error('응답 헤더:', e.response.headers); // 서버의 응답 헤더
    } else if (e.request) {
      console.error('요청이 서버에 도달하지 못함:', e.request); // 요청이 전송되었지만 응답을 받지 못한 경우
    } else {
      console.error('요청 설정 에러:', e.message); // 요청 설정 자체에서 발생한 에러
    }

    console.error('전체 에러 객체:', e); // 전체 에러 객체 출력
  }
};*/
