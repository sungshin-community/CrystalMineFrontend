export default interface User {
    id: number;
    isAuthenticated: boolean;
    authenticatedDate: string;
    expireIn: number;
    profileImage: string;
    username: string;
    nickname: string;
    department: string;
    role: string;
    point: number;
}
