import Response from '../classes/Response';
import client from './client';

export const scrapPost = async (postID: number) => {
  try {
    const response = await client.post<Response<undefined>>(
      `/posts/${postID}/scrap`,
    );
    console.log('scrapPost 함수', response.data);
    return response.data.data;
  } catch (error) {
    console.log('scrapPost 함수', error);
  }
};
