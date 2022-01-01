import SignUpRequestDto from "../classes/SignUpRequestDto";
import client from "./api";
import {AxiosResponse} from 'axios';
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
    const response = await client.post("/auth/signup", signUpRequestDto);
    console.log("데이터", response.data);
    return response.data;
}

export const login = async (signInRequestDto: SignInRequestDto) => {
    const response = await client.post("/auth/signin", signInRequestDto);
    console.log("데이터", response.data);
    return response.data;
}
