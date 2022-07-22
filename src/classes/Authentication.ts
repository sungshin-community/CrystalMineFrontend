export interface Authentication {
  id: string;
  nickname: string;
  isAuthenticated: boolean;
  blacklist: Blacklist;
}
export interface Blacklist {
  id: number;
  username: string;
  createdAt: string;
  reason: string;
  content: string;
 }