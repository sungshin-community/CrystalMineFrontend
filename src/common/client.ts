import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reissueToken } from './authApi';

const client: AxiosInstance = axios.create({
  baseURL: 'http://3.38.29.135:8080',
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map(callback => callback(accessToken));
}

const addRefreshSubscriber = (callback: any) => {
  refreshSubscribers.push(callback);
};

client.interceptors.request.use(async (request: any) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  // console.log(accessToken)
  request.headers.Authorization =  accessToken ? `Bearer ${accessToken}` : '';
  return request;
});

client.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {
    const {config, response: { status }} = error;
    const originalRequest = config;
    if (error.response.status === 500 && originalRequest.url === '/auth/reissue-token') {
      // 리프레시 토큰마저 만료됐으면 로그인 화면으로 이동시키기
      await AsyncStorage.setItem('accessToken', '');
      return Promise.reject(error);
  }
    if (status === 401 && error.response.data.code === 'INVALID_AUTH_TOKEN') {
      if (!isRefreshing) {
        isRefreshing = true;
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await reissueToken({accessToken: accessToken ? accessToken : '', refreshToken: refreshToken ? refreshToken : ''});
        const reissuedAccessToken = response.data.accessToken;
        isRefreshing = false;
        client.defaults.headers.common.Authorization = reissuedAccessToken ? `Bearer ${reissuedAccessToken}` : '';
        onTokenRefreshed(reissuedAccessToken);
      }
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken: string) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          return resolve(client(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  });

export default client;
