import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from '../classes/Board';
import Response from '../classes/Response';

export const getPinnedBoardList = async () => {
  let boardList: Board[] = [];
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const officialResponse = await client.get<Response<Board[]>>(
      `/boards/pin?type=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    officialResponse.data.data.forEach(b => (b.isOfficial = true));
    boardList = boardList.concat(officialResponse.data.data);
    const customResponse = await client.get<Response<Board[]>>(
      `/boards/pin?type=0`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    customResponse.data.data.forEach(b => (b.isOfficial = false));
    boardList = boardList.concat(customResponse.data.data);
    return boardList;
  } catch (e) {
    console.log("여기는 getPinnedBoardList 함수", e);
  }
};

export const getOfficialBoardList = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    params.append('type', '1');
    const response = await client.get<Response<Board[]>>(
      `/boards?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getOfficialBoardList 함수", e);
  }
};

export const getDepartmentBoardList = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    params.append('type', '2');
    const response = await client.get<Response<Board[]>>(
      `/boards?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getDepartmentBoardList 함수", e);
  }
};

export const getCustomBoardList = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    params.append('type', '0');
    const response = await client.get<Response<Board[]>>(
      `/boards?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getCustomBoardList 함수", e);
  }
};

export const toggleBoardPin = async (boardId: number) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await client.post<AxiosResponse>(
      `/boards/${boardId}/pin`,
      null,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    );
    console.log(response.data);
    return true;
  } catch (e) {
    console.log("여기는 toggleBoardPin 함수", e);
    return false;
  }
};

export const getBoardDetail = async (boardId: number, page: number, sort: string = "createdAt") => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('sort', sort);
    const response = await client.get<Response<Board[]>>(
      `/boards/${boardId}?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.log("여기는 getCustomBoardList 함수", e);
  }
}
