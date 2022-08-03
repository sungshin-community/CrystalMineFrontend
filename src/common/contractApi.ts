import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Response from '../classes/Response';
import Agreement, { AgreementAll, DirectionAgreement } from '../classes/Agreement';

// 회원가입 관련 약관 조회
export const getSignUpContract = async () => {
  try {
    const response = await client.get<Response<Agreement[]>>('/contract/signup');
    return response.data.data;
  } catch {
    return [];
  }
}

// 세가지 전문 조회
export const getContractGuide = async () => {
  try {
    const response = await client.get<Response<AgreementAll>>('/contract/guide');
    return response.data.data;
  } catch {
    return [];
  }
}