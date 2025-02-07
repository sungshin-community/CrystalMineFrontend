import {BlindDto, DeleteBlindDto} from './Home';
import {IObjectKeys} from './User';

export default interface AlertDto {
  content: Alert[];
}

export interface Alert {
  id: number;
  from: string;
  type: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  blind?: BlindDto;
  deleteBlind?: DeleteBlindDto;
  postId: number;
  ptPostType?: string; 
}

export interface AlertData extends IObjectKeys {
  type: string;
  contentId?: string;
}
