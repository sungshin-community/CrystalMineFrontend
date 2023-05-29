export default interface MessageDto {
  content: MessageRoom[];
}

export interface MessageRoom {
  roomId: number;
  partnerProfile: string;
  partnerNickname: string;
  postBoard: string;
  lastChat: string;
  lastPhoto: string | null;
  lastChatTime: string;
  unreadCount: number;
  isChecked: boolean;
}
