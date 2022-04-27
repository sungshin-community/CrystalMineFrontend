import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client: AxiosInstance = axios.create({
  baseURL: 'http://3.38.29.135:8080',
});

client.interceptors.request.use(async (request: any) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  request.headers.Authorization =  accessToken ? `Bearer ${accessToken}` : '';
  return request;
});

client.interceptors.response.use(response => {
  // TODO: 401 에러 나면 토큰 연장 로직 추가
  return response;
});

export default client;
