import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../classes/Home';

const getHomeContents = async () => {
    try {
         const response = await client.get<AxiosResponse<Home>>("/home");
        return response.data.data;
    }
    catch (e) {
        console.log("여기는 getHomeContents 함수", e);
    }
};
export default getHomeContents;