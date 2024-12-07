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
//회원보유포인트조회
interface PointResponse {
  timestamp: string;
  code: string;
  status: string;
  detail: string;
  data: {
    userId: number;
    point: number;
  }
}

export const getPoint = async () => {
  try {
    const response = await client.get<PointResponse>('/user/point');
    return response.data.data.point; // point 값만 반환
  } catch (error) {
    console.error('포인트 조회 실패:', error);
    throw error;
  }
};