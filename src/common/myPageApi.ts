import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../classes/User';
import Response from '../classes/Response';

export const getUser = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await client.get<Response<User>>("/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (e) {
    console.log("여기는 getUser 함수", e);
  }
};