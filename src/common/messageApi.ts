import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosResponse, AxiosInstance} from 'axios';

const messageClient: AxiosInstance = axios.create({
  baseURL: 'http://34.64.137.61:8787/',
});

messageClient.interceptors.request.use(async (request: any) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  console.log(accessToken);

  request.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  return request;
});

export const getSocketToken = async () => {
  try {
    const response = await messageClient.get<AxiosResponse>('/chat/token');
    return response.data;
  } catch (e: any) {
    console.error(e);
    return e.response;
  }
};

export const getChatRoom = async (page: number) => {
  try {
    const response = await messageClient.get<AxiosResponse>(
      `/chat-room?page=${page}`,
    );
    return response.data;
  } catch (e: any) {
    console.error(e);
    return e.response;
  }
};
