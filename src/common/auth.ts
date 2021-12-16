import SignUpRequestDto from "../classes/SignUpRequestDto";
import client from "./api";
import {AxiosResponse} from 'axios';
import Major from "../classes/Major";
import SignUpResponseDto from "../classes/SignUpResponseDto";

export const getMajorList = async () => {
    const response = await client.get<Major[]>("/auth/departments");
    // console.log(response);
    // console.log(response.data);
    return response.data;
}
export const signUp = async (signUpRequestDto: SignUpRequestDto) => {
    const response = await client.post<SignUpRequestDto, AxiosResponse<SignUpResponseDto>>("/auth/signup", signUpRequestDto);
    
    console.log("상태", response.status);
    return response.data as SignUpResponseDto;
}
