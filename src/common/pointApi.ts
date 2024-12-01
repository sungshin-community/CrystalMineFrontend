import client from './client';
import {AxiosResponse} from 'axios';

export const getPointRecords = async () => {
  try {
    const response = await client.get<AxiosResponse>('/user/point-record');
    return response.data.data.content;
  } catch (error) {
    console.error('포인트 내역 조회 실패:', error);
    throw error;
  }
};