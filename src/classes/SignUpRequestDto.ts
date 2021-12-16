export default interface SignUpRequestDto {
    userName: string;
    password: string;
    nickname: string;
    agreementIds: number[];
    departmentId: number;
}
