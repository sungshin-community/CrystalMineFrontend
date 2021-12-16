import SignUpRequestDto from "../classes/SignUpRequestDto";
import client from "./api";
import {AxiosResponse} from 'axios';
import Major from "../classes/Major";
import SignUpResponseDto from "../classes/SignUpResponseDto";

export const getMajorList = async () => {
    const response = await client.get<AxiosResponse<Major[]>>("/auth/departments");
    return response.data.data;
}
export const register = async (signUpRequestDto: SignUpRequestDto) => {
    console.log(signUpRequestDto);
    const response = await client.post("/auth/signup", signUpRequestDto);
    console.log("데이터", response.data);
    console.log("상태", response.status);
    return response.data;
}
