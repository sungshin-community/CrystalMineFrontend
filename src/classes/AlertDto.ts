import { BlindDto, DeleteBlindDto } from "./Home";

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
}