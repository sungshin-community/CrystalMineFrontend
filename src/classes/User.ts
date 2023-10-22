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

export interface IObjectKeys {
  [key: string]: string | boolean | number | undefined;
}
export interface UserAlertSetting extends IObjectKeys {
  allSetting: boolean;
  comment: boolean;
  hotBoard: boolean;
  notice: boolean;
  studentCouncil: boolean;
  verification: boolean;
  chat: boolean;
}
