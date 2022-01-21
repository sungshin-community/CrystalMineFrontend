import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../classes/Home';

const getHomeContents = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
         const response = await client.get<AxiosResponse<Home>>(
            "/home",
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
          }
      );
        return response.data.data;
    }
    catch (e) {
        console.log("여기는 getHomeContents 함수", e);
    }
};
export default getHomeContents;