import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentDto from '../classes/CommentDto';
import Response from "../classes/Response";

const getCommments = async () => {
  try {
    const response = await client.get<Response<CommentDto[]>>("/posts/1/comments?page=0");
    return response.data.data;
  }
  catch (e) {
    console.log("여기는 getCommments 함수", e);
  }
};
export default getCommments;