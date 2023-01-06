import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reissueToken } from './authApi';

const client: AxiosInstance = axios.create({
  baseURL: 'http://34.64.137.61:8080/',
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map(callback => callback(accessToken));
  refreshSubscribers = [];
}

const addRefreshSubscriber = (callback: any) => {
  refreshSubscribers.push(callback);
};

client.interceptors.request.use(async (request: any) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  console.log(accessToken)
  // console.log(refreshToken)
  request.headers.Authorization =  accessToken ? `Bearer ${accessToken}` : '';
  return request;
});

client.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {
    console.log("에러 발생! API:", error.config.url, "status:", error.response.status);
    const {config, response: { status }} = error;
    const originalRequest = config;
    if (originalRequest.url === '/auth/reissue-token') {
      console.log("토큰 재발급 실패");
      AsyncStorage.setItem('accessToken', '');
      AsyncStorage.setItem('refreshToken', '');
      return Promise.reject(error);
  }
    if (status === 401) {
      console.log("401 에러 발생");
      // if (!isRefreshing) {
        console.log("토큰 재발급 로직 들어옴");
        isRefreshing = true;
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await reissueToken({accessToken: accessToken ? accessToken : '', refreshToken: refreshToken ? refreshToken : ''});
        const reissuedAccessToken = response.data.accessToken;
        const reissuedRefreshToken = response.data.refreshToken;
        console.log("기존 accessToken:", accessToken);
        console.log("기존 refreshToken:", refreshToken);
        await AsyncStorage.setItem('accessToken', reissuedAccessToken);
        await AsyncStorage.setItem('refreshToken', reissuedRefreshToken);
        console.log("재발급된 accessToken:", reissuedAccessToken);
        console.log("재발급된 refreshToken:", reissuedRefreshToken);
        isRefreshing = false;
        client.defaults.headers.common.Authorization = reissuedAccessToken ? `Bearer ${reissuedAccessToken}` : '';
        // onTokenRefreshed(reissuedAccessToken);
      // }
      // const retryOriginalRequest = new Promise((resolve) => {
      //   addRefreshSubscriber((accessToken: string) => {
      //     originalRequest.headers.Authorization = "Bearer " + accessToken;
      //     return resolve(client(originalRequest));
      //   });
      // });
      return client(originalRequest);
    }
    return Promise.reject(error);
  });

export default client;
