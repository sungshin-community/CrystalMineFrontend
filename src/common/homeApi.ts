import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PinBoardDto, HotBoardDto } from '../classes/Home';

export const getPinBoardContents = async () => {
    try {
         const response = await client.get<AxiosResponse<PinBoardDto[]>>("/home/pin-boards");
        return response.data.data;
    }
    catch (e) {
        console.log("여기는 getPinBoardContents 함수", e);
    }
};

export const getHotBoardContents = async () => {
    try {
         const response = await client.get<AxiosResponse<HotBoardDto>>("/home/hot-posts");
        return response.data.data;
    }
    catch (e) {
        console.log("여기는 getHotBoardContents 함수", e);
    }
};