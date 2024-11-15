import client from './client';

export async function getAllList(
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
    console.error('판테온 전체 글 목록 조회 error:', error);
  }
}

export async function getFreeList(
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
    console.error('판테온 자유 글 목록 조회 error:', error);
  }
}

export const getCuriousList = async (
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
    console.error('판테온 궁금해요 글 목록 조회 error:', error);
  }
};

export const getFreeDetail = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-general/${id}`);
    console.log('판테온 자류 글 상세 조회 response:', response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 자유 글 상세 조회 error:', error);
  }
};

export const getCuriousDetail = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-questions/${id}`);
    console.log('판테온 궁금해요 글 상세 조회 response:', response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.log('판테온 궁금해요 글 상세 조회 error:', error);
  }
};

export const getFreeComment = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-general/${id}/comments`);
    console.log('판테온 자유 댓글 조회 response:', response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.log('궁금해요 댓글 조회 error:', error);
  }
};

export const getCuriousComment = async (id: number) => {
  try {
    const response = await client.get(`/pantheon-questions/${id}/comments`);
    console.log('판테온 궁금해요 댓글 조회 response:', response.data.data);
    return response.data.data;
  } catch (e: any) {
    console.log('판테온 궁금해요 댓글 조회 error:', e);
  }
};

export const postPantheonFree = async (
  content: string,
  title: string,
  isAnonymous: boolean,
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
    };
    formData.append('question', JSON.stringify(questionData));
    await client.post(`/pantheon-general`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log('자유 게시물 작성 완료');
  } catch (e: any) {
    console.log('postPantheonFree함수', e);
  }
};

export const postPantheonQurious = async (
  content: string,
  title: string,
  point: number,
  isAnonymous: boolean,
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
    await client.post(`/pantheon-questions`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log('자유 게시물 작성 완료');
  } catch (e: any) {
    console.log('postPantheonFree함수', e);
  }
};

export const deleltePantheonLike = async (id: number) => {
  try {
    await client.delete(`/pantheon-common/${id}/like`, {});
    console.log('게시물 좋아요 삭제');
  } catch (e: any) {
    console.log('deleltePantheonLike함수', e);
  }
};

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
};

export const postPantheonScrap = async (id: number) => {
  try {
    await client.post(`/pantheon-common/${id}/scrap`);
    console.log('게시물 스크랩');
  } catch (e: any) {
    console.log('postPantheonScrap함수', e);
  }
};

export const postPantheonUnScrap = async (id: number) => {
  try {
    await client.delete(`/pantheon-common/${id}/scrap`);
    console.log('게시물 스크랩 해제');
  } catch (e: any) {
    console.log('postPantheonUnScrap함수', e);
  }
};

export const postPantheonLike = async (id: number) => {
  try {
    await client.post(`/pantheon-common/${id}/like`);
    console.log('게시물 좋아요');
  } catch (e: any) {
    console.log('postPantheonLike함수', e);
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
    console.log('수정구 댓글 생성 완료');
  } catch (e: any) {
    console.log('postPantheonComment함수', e);
  }
};

export const postPantheonReComment = async (
  id: number,
  content: string,
  emoticonId: number,
  isAnonymous: boolean,
  ptPostId: number,
) => {
  try {
    await client.post(`/pantheon-comments/${id}/re-comments`, {
      content: content,
      emoticonId: emoticonId,
      isAnonymous: isAnonymous,
      ptPostId: ptPostId,
    });
    console.log('수정구 대댓글 생성 완료');
  } catch (e: any) {
    console.log('postPantheonReComment함수', e);
  }
};

export const postPurchaseAdopt = async (id: number) => {
  try {
    await client.post(`/pantheon-comments/${id}/purchase`);
    console.log('수정구 대댓글 생성 완료');
  } catch (e: any) {
    console.log('postPurchaseAdopt함수', e);
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
    console.log('궁금해요 댓글 채택');
  } catch (e: any) {
    console.log('postCommentAdopt 함수', e);
    return e.response;
  }
};
