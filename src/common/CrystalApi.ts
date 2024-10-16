import client from './client';

export async function getSaengSaeng() {
  try {
    const response = await client.get('/pantheon-common/best-pt-reviews');
    console.log('생생 수정 후기: ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('생생 수정 후기 오류 발생: ', error);
    return [];
  }
}

export async function getQuestionCrystalball() {
  try {
    const response = await client.get('/pantheon-common/recent-pt-questions');
    console.log('수정구에게 물어봐: ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('수정구에게 물어봐 오류 발생: ', error);
    return [];
  }
}

export async function geRecruiting() {
  try {
    const response = await client.get('/pantheon-common/recruiting-posts');
    console.log('수정이들은 지금: ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('수정이들은 지금 에러 발생: ', error);
    return [];
  }
}

export async function getCrystalReview() {
  try {
    const response = await client.get('/pantheon-reviews');
    console.log('수정 후기 글 목록 조회: ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('수정 후기 글 목록 조회 에러 발생: ', error);
    return [];
  }
}
