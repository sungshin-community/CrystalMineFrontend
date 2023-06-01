import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosResponse, AxiosInstance} from 'axios';

const messageClient: AxiosInstance = axios.create({
  baseURL: 'http://34.64.137.61:8787/',
});

messageClient.interceptors.request.use(async (request: any) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  console.log(accessToken);
  // console.log(refreshToken)
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

// 채팅방 채팅 내역 불러오기
export const getMessageContent = async (roomId: number, page: number) => {
  try {
    const response = await messageClient.get<AxiosResponse>(
      `/chat-room/${roomId}?page=${page}`,
    );
    return response.data;
  } catch (error: any) {
    console.log('message내역 get 실패', error.response.data);
    return error.response.data;
  }
};

// 쪽지보내기 Photo
export const postPhotoMessage = async (
  roomId: number,
  images?: any,
  photoPath?: any,
) => {
  const formData = new FormData();

  if (images && images.length > 0) {
    const image = images[0];
    const fileType = image.type ? image.type : 'image/jpeg'; // 파일의 Content-Type
    const fileName = image.filename ? image.filename : 'photo.jpg'; // 파일 이름
    formData.append('photo', {
      uri: image.uri,
      name: fileName,
      type: fileType,
    });
  } else if (photoPath) {
    formData.append('photo', {
      uri: photoPath,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
  }
  try {
    const response = await messageClient.post<AxiosResponse>(
      `/chat/photo/${roomId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.log('photo 쪽지 보내기 실패', error.response.data);
    return error.response.data;
  }
}