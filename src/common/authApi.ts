import SignUpRequestDto from '../classes/SignUpRequestDto';
import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Major from '../classes/Major';
import SignUpResponseDto from '../classes/SignUpResponseDto';
import SignInRequestDto from '../classes/SignInRequestDto';
import VerificationRequestDto from '../classes/VerificationRequestDto';
import ResetPasswordRequestDto from '../classes/ResetPasswordRequestDto';
import ResetPasswordVerificationRequestDto from '../classes/ResetPasswordVerificationRequestDto';
import Response from '../classes/Response';
import Agreement, {AgreementAll, DirectionAgreement} from '../classes/Agreement';
import TokenReissueDto from '../classes/TokenReissueDto';
import User from '../classes/User';

// 서비스 이용약관
export const getAgreements = async () => {
  try {
    const response = await client.get<Response<Agreement[]>>('/contract/agreements/0');
    return response.data.data;
  } catch {
    return [];
  }
}
// 서비스 이용 방향
export const getDirectionAgreements = async () => {
  try {
    const response = await client.get<Response<Agreement[]>>('/contract/directions');
    return response.data.data;
  } catch {
    return [];
  }
}

// 통으로 내려오는 이용 방향, 이용약관, 개인정보 처리방침
export const getAllAgreements = async () => {
  try {
    const response = await client.get<Response<AgreementAll>>('/contract');
    return response.data.data;
  } catch {
    return [];
  }
}

export const checkEmailConflict = async (studentId: string) => {
  try {
    const response = await client.get<AxiosResponse>(
      '/auth/check-username/' + studentId,
    );
    if (response.status === 200) {
      return response.data.code;
    }
  } catch (error) {
    return error.message;
  }
  return false;
};

export const checkNicknameConflict = async (nickname: string) => {
  try {
    const response = await client.get<AxiosResponse>(
      '/auth/check-nickname/' + nickname,
    );
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

export const getMajorList = async () => {
  const response = await client.get<Response<Major[]>>('/auth/departments');
  return response.data.data;
};
export const register = async (signUpRequestDto: SignUpRequestDto) => {
  console.log(signUpRequestDto);
  try {
    const response = await client.post<Response<SignUpResponseDto>>(
      '/auth/signup',
      signUpRequestDto,
    );
    console.log(response.data.data);
    await AsyncStorage.setItem(
      'accessToken',
      response.data.data.tokenDto.accessToken,
    );
    await AsyncStorage.setItem(
      'refreshToken',
      response.data.data.tokenDto.refreshToken,
    );
    return true;
  } catch (e) {
    console.log('여기는 register 함수', e);
    return false;
  }
};

export const sendEmail = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.post<AxiosResponse>(
      '/mail/regular-member',
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return true;
  } catch (e) {
    console.log('여기는 sendEmail 함수', e);
    return false;
  }
};

export const checkAuthNumber = async (code: string) => {
  try {
    let requestDto: VerificationRequestDto = {code: code};
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.post<AxiosResponse>(
      '/mail/regular-member-verification',
      requestDto,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data.data)
    return 0;
  } catch (e: any) {
    console.log('여기는 checkAuthNumber 함수', e.response.data);
    return 1;
  }
};

export const login = async (signInRequestDto: SignInRequestDto) => {
  try {
    const response = await client.post<Response<SignUpResponseDto>>(
      '/auth/signin',
      signInRequestDto,
    );
    console.log('>>>>>>>>', response.data.data);
    await AsyncStorage.setItem(
      'accessToken',
      response.data.data.tokenDto.accessToken,
    );
    await AsyncStorage.setItem(
      'refreshToken',
      response.data.data.tokenDto.refreshToken,
    );
    await AsyncStorage.setItem('uuid', response.data.data.uuid);
    return true;
  } catch (e: any) {
    console.log('여기는 login 함수', e.response.data);
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.setItem('accessToken', '');
    return true;
  } catch (e: any) {
    console.log('여기는 logout 함수', e.response);
    return false;
  }
};

export const reissueToken = async (tokenReissueDto: TokenReissueDto) => {
  try {
    const response = await client.post<Response<TokenReissueDto>>('/auth/reissue-token', tokenReissueDto);
    await AsyncStorage.multiSet([['accessToken', response.data.data.accessToken], ['refreshToken', response.data.data.refreshToken]]);
    return response.data;
  } catch (e: any) {
    return e.response;
  }
}
 export const checkRegularMember = async () => {
  try {
    const response = await client.get<Response<User>>('/user');
    return response.data.data.isAuthenticated;
  } catch (e: any) {
    console.log('여기는 checkRegularMember 함수', e.response);
    return false;
  }
};

export const sendResetPasswordEmail = async (resetPasswordRequestDto: ResetPasswordRequestDto) => {
  let response;
  try {
    response = await client.post<Response<AxiosResponse>>(
      '/mail/reset-password',
      resetPasswordRequestDto,
    );
    return 'SEND_RESET_PASSWORD_MAIL_SUCCESS';
  } catch (e) {
    console.log('여기는 비밀번호 재설정 이메일 전송 함수', e.response.data.code);
    return e.response.data.code;
  }
};

export const checkResetPasswordAuthNumber = async (resetPasswordVerificationRequestDto: ResetPasswordVerificationRequestDto) => {
  try {
    const response = await client.post<AxiosResponse>(
      '/mail/reset-password-verification',
      resetPasswordVerificationRequestDto,
    );
    return 0;
  } catch (e: any) {
    console.log(
      '여기는 비번재설정 인증번호 확인 함수',
      e.response.data
    );
    return e.response.data.data.attemptCount;
  }
};
export const checkNewPassword = async (resetPasswordRequestDto: SignInRequestDto) => {
  try {
    const response = await client.post<AxiosResponse>(
      '/auth/check-password',
      resetPasswordRequestDto,
    );
    console.log('여긴 비번 중복 확인 함수', response.data.status)
    return 0;
  } catch (e: any) {
    console.log('여긴 비번 중복 확인 함수', e.response.data.status);
    return e.response.data.status;
  }
};
export const resetPassword = async (resetPasswordRequestDto: SignInRequestDto) => {
  try {
    const response = await client.post<AxiosResponse>(
      '/auth/reset-password',
      resetPasswordRequestDto,
    );
    console.log('여긴 비번재설정 함수', response.data.status)
    return 0;
  } catch (e: any) {
    console.log('여긴 비번재설정 함수', e.response.data.status);
    return e.response.data.status;
  }
};

export const getQuitAgreements = async () => {
  try {
    const response = await client.get<Response<Agreement[]>>('/contract/delete-account');
    return response.data.data;
  } catch {
    return [];
  }
};

export const applyQuitMembership = async (password: string) => {
  try {
    const response = await client.delete<Response<null>>('/user', {
      data: {password},
    });
    console.log('회원탈퇴 성공', response.data);
    return true;
  } catch (error: any) {
    console.log('회원탈퇴 실패', error.response);
    return false;
  }
};
