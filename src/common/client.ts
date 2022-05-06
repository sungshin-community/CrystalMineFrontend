import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reissueToken } from './authApi';

const client: AxiosInstance = axios.create({
  baseURL: 'http://3.38.29.135:8080',
});

client.interceptors.request.use(async (request: any) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  request.headers.Authorization =  accessToken ? `Bearer ${accessToken}` : '';
  return request;
});

client.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {
    console.log("여기는 axios interceptor error는", error);
    const {config, response: { status }} = error;
    if (status === 401) {
      if (error.response.data.code === 'INVALID_AUTH_TOKEN') {
        const originalRequest = config;
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await reissueToken({accessToken: accessToken ? accessToken : '', refreshToken: refreshToken ? refreshToken : ''});
        console.log("여기는 axios intercepter, reissueToken의 리턴값은", response);
        const reissuedAccessToken = response.data.accessToken;
        const reissuedRefreshToken = response.data.refreshToken;
        client.defaults.headers.common.Authorization = reissuedAccessToken ? `Bearer ${reissuedAccessToken}` : '';
        return client(originalRequest);
      }
    }
    return Promise.reject(error);
  });

export default client;
