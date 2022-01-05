import SignUpRequestDto from "../classes/SignUpRequestDto";
import client from "./client";
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Major from "../classes/Major";
import SignUpResponseDto from "../classes/SignUpResponseDto";
import SignInRequestDto from "../classes/SignInRequestDto";

export const checkEmailConflict = async (studentId: string) => {
    try {
        const response = await client.get<AxiosResponse>("/auth/check-username/" + studentId);
        if (response.status === 200) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
    return false;
}

export const checkNicknameConflict = async (nickname: string) => {
    try {
        const response = await client.get<AxiosResponse>("/auth/check-nickname/" + nickname);
        if (response.status === 200) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
    return false;
}

export const getMajorList = async () => {
    const response = await client.get<AxiosResponse<Major[]>>("/auth/departments");
    return response.data.data;
}
export const register = async (signUpRequestDto: SignUpRequestDto) => {
    try {
        const response = await client.post<AxiosResponse<SignUpResponseDto>>("/auth/signup", signUpRequestDto);
        console.log(response.data.data);
        await AsyncStorage.setItem("accessToken", response.data.data.tokenDto.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.data.tokenDto.refreshToken);
        await AsyncStorage.setItem("nickname", response.data.data.nickname);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export const sendEmail = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await client.post<AxiosResponse>("/mail/regular-member", null, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        console.log(response.data);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export const login = async (signInRequestDto: SignInRequestDto) => {
    try {
        const response = await client.post<AxiosResponse<SignUpResponseDto>>("/auth/signin", signInRequestDto);
        console.log(response.data.data);
        await AsyncStorage.setItem("accessToken", response.data.data.tokenDto.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.data.tokenDto.refreshToken);
        await AsyncStorage.setItem("nickname", response.data.data.nickname);
        return true;
    }
    catch(e) {
        console.log(e);
        return false;
    }
}

