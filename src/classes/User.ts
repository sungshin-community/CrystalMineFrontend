export default interface User {
    id: number;
    isAuthenticated: boolean;
    authenticatedDate: string;
    expireIn: number;
    profileImage: string;
    username: number;
    nickname: string;
    department: string;
    role: string;
    point: number;
    email: string;
}

interface IObjectKeys {
  [key: string]: string | boolean | number;
}
export interface UserAlertSetting extends IObjectKeys {
  allSetting: boolean;
  comment: boolean;
  hotBoard: boolean;
  notice: boolean;
  verification: boolean;
}
