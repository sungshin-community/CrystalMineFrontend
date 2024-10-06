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
