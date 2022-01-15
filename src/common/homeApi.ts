import client from './client';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../classes/Home';

const getHomeContents = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
         const response = await client.get<AxiosResponse<Home[]>>(
            "/home",
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
          }
      );
        console.log('>>>>>>>' + JSON.stringify(response.data));
        return response.data.data;
    }
    catch (e) {
        console.log(e);
    }
};
export default getHomeContents;