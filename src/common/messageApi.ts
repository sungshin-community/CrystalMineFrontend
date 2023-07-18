import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosResponse, AxiosInstance} from 'axios';

const messageClient: AxiosInstance = axios.create({
  baseURL: 'http://3.34.16.137:8787/',
});

//소켓토큰 아니고 로그인토큰 사용중... api 주소 달라서 분리함.
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

export const getChatRoom = async (page: number, sort: string) => {
  try {
    const response = await messageClient.get<AxiosResponse>(
      `/chat-room?page=${page}&sort=${sort}`,
    );
    return response.data;
  } catch (e: any) {
    console.error(e);
    return e.response;
  }
};

export const postChatRoom = async (data: any) => {
  try {
    const response = await messageClient.post<AxiosResponse>(
      '/chat-room',
      data,
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
};
// 쪽지방 나가기
export const deleteChatRoom = async (roomId: number) => {
  try {
    const response = await messageClient.delete<AxiosResponse>(
      `/chat-room/${roomId}`,
    );
    return response.data;
  } catch (e: any) {
    return e.response;
  }
};
// 쪽지방 차단
export const patchBlockChatRoom = async (roomId: number) => {
  try {
    const response = await messageClient.patch<AxiosResponse>(
      `/chat-room/block/${roomId}`,
    );
    return response.data;
  } catch (e: any) {
    return e.response;
  }
};
